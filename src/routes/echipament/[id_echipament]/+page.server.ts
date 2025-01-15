import { db } from '$lib/server/db';
import { equipment } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';

export async function load({ params }) {
	const id = parseInt(params.id_echipament);
	const [{ id: _, ...result }] = await db.select().from(equipment).where(eq(equipment.id, id));
	const data = { ...result, purchasePrice: parseFloat(result.purchasePrice) };
	const form = await superValidate(data, zod(updateFormSchema));
	return { id, result: data, form };
}

export const actions = {
	update: async (event) => {
		const id = parseInt(event.params.id_echipament);
		const form = await superValidate(event, zod(updateFormSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(equipment)
			.set({ ...form.data, purchasePrice: form.data.purchasePrice.toFixed(2) })
			.where(eq(equipment.id, id));
		return { form };
	},
	delete: async (event) => {
		const id = parseInt(event.params.id_echipament);
		try {
			await db.delete(equipment).where(eq(equipment.id, id));
		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				return fail(400, { ...e });
			}
		}

		return redirect(303, '/client');
	}
};
