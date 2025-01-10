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
	$inspect($formData.createdAt);
</script>

<form method="POST" use:enhance class="flex flex-col">
	<Form.Field {form} name="createdAt">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>moment_configurare</Form.Label>
				<Input
					type="datetime-local"
					{...props}
					bind:value={() => $formData.createdAt?.slice(0, -3),
					(v) => {
						$formData.createdAt?.length == 0
							? ($formData.createdAt = null)
							: ($formData.createdAt = v + ':00');
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="power">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>putere</Form.Label>
				<Input {...props} bind:value={$formData.power} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="priority">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>prioritate</Form.Label>
				<Input type="number" {...props} bind:value={$formData.priority} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="equipmentId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cod_echipament</Form.Label>
				<Input type="number" {...props} bind:value={$formData.equipmentId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="technicianId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>cod_tehnician</Form.Label>
				<Input type="number" {...props} bind:value={$formData.technicianId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mt-4">Adaugă</Form.Button>
</form>
