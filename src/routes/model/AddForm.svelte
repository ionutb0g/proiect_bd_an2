<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { toast } from 'svelte-sonner';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		data: SuperValidated<Infer<FormSchema>>;
		isDialogOpen?: boolean;
	}

	let { data, isDialogOpen = $bindable(false) }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onResult({ result }) {
			if (result.type === 'success') {
				toast.success('Modelul a fost adăugat cu succes');
				isDialogOpen = false;
			}
			if (result.type === 'failure') {
				toast.error('Acțiunea a eșuat');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex flex-col">
	<Form.Field {form} name="manufacturer">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>producator</Form.Label>
				<Input {...props} bind:value={$formData.manufacturer} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>denumire</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="batteryCapacity">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>capacitate_baterie</Form.Label>
				<Input type="number" {...props} bind:value={$formData.batteryCapacity} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="power">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>putere</Form.Label>
				<Input type="number" {...props} step="0.1" bind:value={$formData.power} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4">Adaugă</Form.Button>
</form>
