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
				toast.success('Tehnicianul a fost adăugat cu succes');
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
	<Form.Field {form} name="cnp">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cnp</Form.Label>
				<Input inputmode="numeric" {...props} bind:value={$formData.cnp} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="firstName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>prenume</Form.Label>
				<Input {...props} bind:value={$formData.firstName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="lastName">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>nume</Form.Label>
				<Input {...props} bind:value={$formData.lastName} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="phoneNumber">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>numar_telefon</Form.Label>
				<Input inputmode="tel" {...props} bind:value={$formData.phoneNumber} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="hireDate">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>data_angajare</Form.Label>
				<Input type="date" {...props} bind:value={$formData.hireDate} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="salary">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>salariu</Form.Label>
				<Input type="number" inputmode="decimal" {...props} bind:value={$formData.salary} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mt-4">Adaugă</Form.Button>
</form>
