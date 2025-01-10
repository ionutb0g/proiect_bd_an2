<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Switch from '$lib/components/ui/switch/switch.svelte';
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
				toast.success('Clientul a fost adăugat cu succes');
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
	<Form.Field {form} name="cif">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cif_client</Form.Label>
				<Input {...props} bind:value={$formData.cif} />
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
	<Form.Field {form} name="vat">
		<Form.Control>
			{#snippet children({ props })}
				<div class="flex items-center justify-between py-2">
					<Form.Label>platitor_tva</Form.Label>
					<Switch {...props} bind:checked={$formData.vat} />
				</div>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="area">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>judet</Form.Label>
				<Input {...props} bind:value={$formData.area} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="city">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>localitate</Form.Label>
				<Input {...props} bind:value={$formData.city} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="street">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>strada</Form.Label>
				<Input {...props} bind:value={$formData.street} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="houseNumber">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>nr_stradal</Form.Label>
				<Input type="number" {...props} bind:value={$formData.houseNumber} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-4">Adaugă</Form.Button>
</form>
