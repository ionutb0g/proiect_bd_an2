import { db } from '$lib/server/db';
import { configuration } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';
import { fail } from '@sveltejs/kit';
import { parse, getTime } from 'date-fns';
import { z } from 'zod';

export async function load() {
	const result = await db.select().from(configuration);

	return { result, addForm: await superValidate(zod(formSchema)) };
}

export const actions = {
	default: async (event) => {
		const addForm = await superValidate(
			event,
			zod(formSchema.extend({ createdAt: z.coerce.date().optional() }))
		);
		if (!addForm.valid) {
			return fail(400, { addForm });
		}
		console.log(addForm.data);

		try {
			await db.insert(configuration).values({ ...addForm.data });
		} catch (err) {
			return fail(400, { addForm });
		}
		return { addForm };
	}
};
