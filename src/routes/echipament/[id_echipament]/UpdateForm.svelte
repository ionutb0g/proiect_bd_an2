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
				toast.success('Echipamentul a fost actualizat cu succes!');
			}
			if (result.type === 'failure') {
				toast.error('Acțiunea a eșuat');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/update" use:enhance class="flex flex-col">
	<Form.Field {form} name="serialNumber">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>nr_serie</Form.Label>
				<Input {...props} bind:value={$formData.serialNumber} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="purchaseDate">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>data_achizitie</Form.Label>
				<Input type="date" {...props} bind:value={$formData.purchaseDate} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="purchasePrice">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>pret_achizitie</Form.Label>
				<Input type="number" step="0.01" {...props} bind:value={$formData.purchasePrice} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="warranty">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>garantie</Form.Label>
				<Input type="number" {...props} bind:value={$formData.warranty} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="modelId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cod_model</Form.Label>
				<Input type="number" {...props} bind:value={$formData.modelId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4">Actualizează</Form.Button>
</form>
