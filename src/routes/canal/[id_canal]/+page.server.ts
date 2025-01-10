import { db } from '$lib/server/db';
import { channel } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const id = parseInt(params.id_canal);
	const [{ id: _, ...result }] = await db.select().from(channel).where(eq(channel.id, id));
	const data = { ...result, frequency: parseFloat(result.frequency) };
	const form = await superValidate(data, zod(updateFormSchema));
	return { id, result: data, form };
}

export const actions = {
	update: async (event) => {
		const id = parseInt(event.params.id_canal);
		const form = await superValidate(event, zod(updateFormSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(channel)
			.set({ ...form.data, frequency: form.data.frequency.toFixed(6) })
			.where(eq(channel.id, id));
		return { form };
	},
	delete: async (event) => {
		const id = parseInt(event.params.id_canal);
		await db.delete(channel).where(eq(channel.id, id));
		return redirect(303, '/client');
	}
};
