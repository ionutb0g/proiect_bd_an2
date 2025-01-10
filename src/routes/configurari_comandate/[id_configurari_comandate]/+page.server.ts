import { db } from '$lib/server/db';
import { orderedConfiguration } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function load({ params }) {
	const [orderId, configId] = params.id_configurari_comandate.split('_').map((v) => parseInt(v));
	const [result] = await db
		.select()
		.from(orderedConfiguration)
		.where(
			and(
				eq(orderedConfiguration.orderId, orderId),
				eq(orderedConfiguration.configurationId, configId)
			)
		);

	const form = await superValidate(
		{ ...result, price: parseFloat(result.price) },
		zod(updateFormSchema)
	);
	return { result, form };
}

export const actions = {
	update: async (event) => {
		const [orderId, configId] = event.params.id_configurari_comandate
			.split('_')
			.map((v) => parseInt(v));
		const form = await superValidate(event, zod(updateFormSchema));

		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(orderedConfiguration)
			.set({ ...form.data, price: form.data.price.toFixed(2) })
			.where(
				and(
					eq(orderedConfiguration.orderId, orderId),
					eq(orderedConfiguration.configurationId, configId)
				)
			);
		return { form };
	},
	delete: async (event) => {
		const [orderId, configId] = event.params.id_configurari_comandate
			.split('_')
			.map((v) => parseInt(v));
		await db
			.delete(orderedConfiguration)
			.where(
				and(
					eq(orderedConfiguration.orderId, orderId),
					eq(orderedConfiguration.configurationId, configId)
				)
			);
		return redirect(303, '/configurare');
	}
};
