<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Switch from '$lib/components/ui/switch/switch.svelte';
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
				toast.success('Canalul a fost actualizat cu succes!');
			}
			if (result.type === 'failure') {
				toast.error('Acțiunea a eșuat');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/update" use:enhance class="flex flex-col">
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>denumire</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="frequency">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>frecventa</Form.Label>
				<Input type="number" step="0.000001" {...props} bind:value={$formData.frequency} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="digital">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex items-center justify-between py-2">
					<Form.Label>digital</Form.Label>
					<Switch {...props} bind:checked={$formData.digital} />
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="encrypted">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex items-center justify-between py-2">
					<Form.Label>criptat</Form.Label>
					<Switch {...props} bind:checked={$formData.encrypted} />
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4">Actualizează</Form.Button>
</form>
