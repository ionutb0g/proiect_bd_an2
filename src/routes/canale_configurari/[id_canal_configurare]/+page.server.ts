import { db } from '$lib/server/db';
import { configurationChannels } from '$lib/server/db/public_schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateFormSchema } from '../schema';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function load({ params }) {
	const [configId, channelId] = params.id_canal_configurare.split('_').map((v) => parseInt(v));
	const [result] = await db
		.select()
		.from(configurationChannels)
		.where(
			and(
				eq(configurationChannels.configurationId, configId),
				eq(configurationChannels.channelId, channelId)
			)
		);

	const form = await superValidate(result, zod(updateFormSchema));
	return { result, form };
}

export const actions = {
	update: async (event) => {
		const [configId, channelId] = event.params.id_canal_configurare
			.split('_')
			.map((v) => parseInt(v));
		const form = await superValidate(event, zod(updateFormSchema));

		if (!form.valid) {
			console.log(form.errors);
			return fail(400, { form });
		}
		await db
			.update(configurationChannels)
			.set(form.data)
			.where(
				and(
					eq(configurationChannels.configurationId, configId),
					eq(configurationChannels.channelId, channelId)
				)
			);
		return { form };
	},
	delete: async (event) => {
		const [configId, channelId] = event.params.id_canal_configurare
			.split('_')
			.map((v) => parseInt(v));
		await db
			.delete(configurationChannels)
			.where(
				and(
					eq(configurationChannels.configurationId, configId),
					eq(configurationChannels.channelId, channelId)
				)
			);
		return redirect(303, '/configurare');
	}
};
