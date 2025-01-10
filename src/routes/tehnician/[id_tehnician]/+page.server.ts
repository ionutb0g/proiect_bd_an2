import { db } from '$lib/server/db';
import { technician } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	const id = parseInt(params.id_tehnician);
	const [{ id: _, ...result }] = await db.select().from(technician).where(eq(technician.id, id));
	const data = { ...result, salary: parseFloat(result.salary) };
	const form = await superValidate(data, zod(updateFormSchema));
	return { id, result, form };
}

export const actions = {
	update: async (event) => {
		const id = parseInt(event.params.id_tehnician);
		const form = await superValidate(event, zod(updateFormSchema));
		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(technician)
			.set({ ...form.data, salary: form.data.salary.toFixed(2) })
			.where(eq(technician.id, id));
		return { form };
	},
	delete: async (event) => {
		const id = parseInt(event.params.id_tehnician);
		await db.delete(technician).where(eq(technician.id, id));
		return redirect(303, '/client');
	}
};
