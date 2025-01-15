import { db } from '$lib/server/db';
import { technician } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';
import { fail } from '@sveltejs/kit';
import { asc, desc, SQL } from 'drizzle-orm';

function isValidColumn(colName: string): colName is keyof typeof technician.$inferInsert {
	if (Object.keys(technician).includes(colName)) {
		return true;
	}
	return false;
}

export async function load({ url }) {
	const query = db.select().from(technician);

	const sortConditions: SQL<unknown>[] = [];

	for (const rule of url.searchParams.getAll('order_by')) {
		const [colName, colDir] = rule.split('_');
		if (colName && isValidColumn(colName)) {
			const orderDirFn = colDir === 'desc' ? desc : asc;
			sortConditions.push(orderDirFn(technician[colName]));
		}
	}
	if (sortConditions.length) {
		query.orderBy(...sortConditions);
	}

	const result = await query;

	return { result, addForm: await superValidate(zod(formSchema)) };
}

export const actions = {
	default: async (event) => {
		const addForm = await superValidate(event, zod(formSchema));
		if (!addForm.valid) {
			return fail(400, { addForm });
		}
		try {
			await db
				.insert(technician)
				.values({ ...addForm.data, salary: addForm.data.salary.toFixed(2) });
		} catch (err) {
			return fail(400, { addForm });
		}
		return { addForm };
	}
};
