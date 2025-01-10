<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import UpdateForm from './UpdateForm.svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

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
			client: {data.id}
		</h1>
	</div>
	<form
		action="?/delete"
		method="POST"
		use:enhance={() => () => {
			history.back();
			toast.success('Canalul a fost eliminat cu succes');
		}}
	>
		<Button type="submit" variant="destructive">Elimină</Button>
	</form>
</header>

<div class="mx-auto my-16 max-w-lg">
	<UpdateForm data={data.form} />
</div>
