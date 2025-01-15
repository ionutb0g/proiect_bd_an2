import { db } from '$lib/server/db';
import { configuration } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { format, parse } from 'date-fns';
import { z } from 'zod';
import postgres from 'postgres';

export async function load({ params }) {
	const id = parseInt(params.id_configurare);
	const [{ id: _, ...result }] = await db
		.select()
		.from(configuration)
		.where(eq(configuration.id, id));
	const data = { ...result, createdAt: format(result.createdAt, "yyyy-MM-dd'T'HH:mm:ss") };

	const form = await superValidate(data, zod(updateFormSchema));
	return { id, result: data, form };
}

export const actions = {
	update: async (event) => {
		const id = parseInt(event.params.id_configurare);
		const form = await superValidate(
			event,
			zod(updateFormSchema.extend({ createdAt: z.coerce.date().optional() }))
		);
		console.log('x: ', form.data);
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(configuration)
			.set({
				...form.data,
				createdAt: form.data.createdAt ?? undefined
			})
			.where(eq(configuration.id, id));
		return { form };
	},
	delete: async (event) => {
		const id = parseInt(event.params.id_configurare);
		try {
			await db.delete(configuration).where(eq(configuration.id, id));
		} catch (e) {
			if (e instanceof postgres.PostgresError) {
				return fail(400, { ...e });
			}
		}
		return redirect(303, '/configurare');
	}
};
