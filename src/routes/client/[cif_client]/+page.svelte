<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import UpdateForm from './UpdateForm.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { PostgresError } from 'postgres';

	let { data } = $props();
</script>

<header class="flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Button
			href="./"
			variant="ghost"
			onclick={(e) => {
				e.preventDefault();
				history.back();
			}}
		>
			<ArrowLeft />
		</Button>
		<h1 class="text-xl font-bold text-primary">
			client: {data.result.cif}
		</h1>
	</div>
	<form
		action="?/delete"
		method="POST"
		use:enhance={() => (e) => {
			if (e.result.type !== 'failure') {
				history.back();
				toast.success('Clientul a fost eliminat cu succes');
			}
			if (e.result.type === 'failure') {
				toast.error('Eroare', { description: (e.result.data as unknown as PostgresError).detail });
			}
		}}
	>
		<Button type="submit" variant="destructive">Elimină</Button>
	</form>
</header>

<div class="mx-auto my-16 max-w-lg">
	<UpdateForm data={data.form} />
</div>
