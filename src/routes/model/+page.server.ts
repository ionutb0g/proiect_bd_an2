import { db } from '$lib/server/db';
import { model } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';
import { fail } from '@sveltejs/kit';

export async function load() {
	const result = await db.select().from(model);

	return { result, addForm: await superValidate(zod(formSchema)) };
}

export const actions = {
	default: async (event) => {
		const addForm = await superValidate(event, zod(formSchema));
		if (!addForm.valid) {
			return fail(400, { addForm });
		}
		try {
			await db.insert(model).values({ ...addForm.data, power: addForm.data.power.toFixed(1) });
		} catch (err) {
			return fail(400, { addForm });
		}
		return { addForm };
	}
};
