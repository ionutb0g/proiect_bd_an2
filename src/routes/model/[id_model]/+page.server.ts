import { db } from '$lib/server/db';
import { model } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';

export async function load({ params }) {
	const id = parseInt(params.id_model);
	let [{ id: _, ...result }] = await db.select().from(model).where(eq(model.id, id));
	const data = { ...result, power: parseFloat(result.power) };
	const form = await superValidate(data, zod(updateFormSchema));
	return { id, result: data, form };
}

export const actions = {
	update: async (event) => {
		const id = parseInt(event.params.id_model);
		const form = await superValidate(event, zod(updateFormSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(model)
			.set({ ...form.data, power: form.data.power.toString() })
			.where(eq(model.id, id));
		return { form };
	},
	delete: async (event) => {
		const id = parseInt(event.params.id_model);
		try {
			await db.delete(model).where(eq(model.id, id));
		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				return fail(400, { ...e });
			}
		}
		return redirect(303, '/client');
	}
};
