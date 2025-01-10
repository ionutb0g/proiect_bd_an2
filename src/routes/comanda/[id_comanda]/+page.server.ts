import { db } from '$lib/server/db';
import { order } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const id = parseInt(params.id_comanda);
	const [{ id: _, ...result }] = await db.select().from(order).where(eq(order.id, id));
	const data = {
		...result,
		discount: result.discount ? parseFloat(result.discount) : undefined,
		damageCost: result.damageCost ? parseFloat(result.damageCost) : undefined
	};
	const form = await superValidate(data, zod(updateFormSchema));
	return { id, result, form };
}

export const actions = {
	update: async (event) => {
		const id = parseInt(event.params.id_comanda);
		const form = await superValidate(event, zod(updateFormSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(order)
			.set({
				...form.data,
				discount: form.data.discount?.toFixed(2) ?? null,
				damageCost: form.data.damageCost?.toFixed(2) ?? null
			})
			.where(eq(order.id, id));
		return { form };
	},
	delete: async (event) => {
		const id = parseInt(event.params.id_comanda);
		await db.delete(order).where(eq(order.id, id));
		return redirect(303, '/client');
	}
};
