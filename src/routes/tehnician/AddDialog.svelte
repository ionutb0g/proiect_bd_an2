<script lang="ts">
	import type { PageData } from './$types.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button';
	import AddForm from './AddForm.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	let { addForm }: { addForm: PageData['addForm'] } = $props();

	let isOpen = $state(false);
</script>

<Sheet.Root bind:open={isOpen}>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button {...props}>Adaugă</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content class="flex h-full flex-col px-0">
		<Sheet.Header class="mb-4 px-4">
			<Sheet.Title>Adaugă un tehnician nou</Sheet.Title>
		</Sheet.Header>
		<ScrollArea>
			<div class="px-4">
				<AddForm data={addForm} bind:isDialogOpen={isOpen} />
			</div>
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>
