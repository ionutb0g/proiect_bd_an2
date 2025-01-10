import { db } from '$lib/server/db';
import { customer } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';
import { fail } from '@sveltejs/kit';
import { asc, desc } from 'drizzle-orm';

function isValidColumn(colName: string): colName is keyof typeof customer.$inferInsert {
	if (Object.keys(customer).includes(colName)) {
		return true;
	}
	return false;
}

export async function load({ url }) {
	const sortColumn = url.searchParams.get('order_by');
	const sortDirection = url.searchParams.get('order_direction');

	const query = db.select().from(customer);
	if (sortColumn && isValidColumn(sortColumn)) {
		const orderDirFn = sortDirection === 'desc' ? desc : asc;
		query.orderBy(orderDirFn(customer[sortColumn]));
	}

	const result = await query;

	return { result, sortColumn, sortDirection, addForm: await superValidate(zod(formSchema)) };
}

export const actions = {
	default: async (event) => {
		const addForm = await superValidate(event, zod(formSchema));
		if (!addForm.valid) {
			return fail(400, { addForm });
		}
		try {
			await db.insert(customer).values(addForm.data);
		} catch (err) {
			return fail(400, { addForm });
		}
		return { addForm };
	}
};
