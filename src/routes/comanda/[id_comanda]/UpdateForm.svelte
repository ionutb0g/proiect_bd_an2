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
				toast.success('Comanda a fost actualizat cu succes!');
			}
			if (result.type === 'failure') {
				toast.error('Acțiunea a eșuat');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/update" use:enhance class="flex flex-col">
	<Form.Field {form} name="paymentMethod">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>metoda_plata</Form.Label>
				<Input {...props} bind:value={$formData.paymentMethod} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="startedAt">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>data_inchiriere</Form.Label>
				<Input type="date" {...props} bind:value={$formData.startedAt} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="endedAt">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>data_returnare</Form.Label>
				<Input type="date" {...props} bind:value={$formData.endedAt} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="discount">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>discount</Form.Label>
				<Input type="number" step="0.01" {...props} bind:value={$formData.discount} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="damageCost">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cost_daune</Form.Label>
				<Input type="number" {...props} bind:value={$formData.damageCost} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="customerCui">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cif_client</Form.Label>
				<Input {...props} bind:value={$formData.customerCui} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4">Actualizează</Form.Button>
</form>
