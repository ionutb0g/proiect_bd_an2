import { db } from '$lib/server/db';
import { customer } from '$lib/server/db/public_schema';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const cif = params.cif_client;
	const [result] = await db.select().from(customer).where(eq(customer.cif, cif));
	const form = await superValidate(result, zod(updateFormSchema));
	return { result, form };
}

export const actions = {
	update: async (event) => {
		const cif = event.params.cif_client;
		const form = await superValidate(event, zod(updateFormSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db.update(customer).set(form.data).where(eq(customer.cif, cif));
		return { form };
	},
	delete: async (event) => {
		const cif = event.params.cif_client;
		await db.delete(customer).where(eq(customer.cif, cif));
		return redirect(303, '/client');
	}
};
