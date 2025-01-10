<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { toast } from 'svelte-sonner';
	import { updateFormSchema, type UpdateFormSchema } from '../schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		data: SuperValidated<Infer<UpdateFormSchema>>;
	}

	let { data }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(updateFormSchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'success') {
				toast.success('Asocierea a fost actualizată cu succes!');
			}
			if (result.type === 'failure') {
				toast.error('Acțiunea a eșuat');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/update" use:enhance class="flex flex-col">
	<Form.Field {form} name="orderId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cod_comanda</Form.Label>
				<Input type="number" {...props} bind:value={$formData.orderId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="configurationId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cod_configurare</Form.Label>
				<Input type="number" {...props} bind:value={$formData.configurationId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="price">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>pret</Form.Label>
				<Input type="number" step="0.01" {...props} bind:value={$formData.price} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4">Actualizează</Form.Button>
</form>
