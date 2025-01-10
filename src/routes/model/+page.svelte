<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowRight, Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AddDialog from './AddDialog.svelte';

	let { data } = $props();
</script>

<header class="flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">model</span></h1>
	</div>
	<div class="flex items-center gap-2">
		<Button variant="outline">Sortare</Button>
		<AddDialog addForm={data.addForm} />
	</div>
</header>

<div class="m-8 flex flex-col overflow-hidden rounded-lg border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="flex items-center gap-1 text-primary">
					<Key size={14} />
					<span>id_model</span>
				</Table.Head>
				<Table.Head>producator</Table.Head>
				<Table.Head>denumire</Table.Head>
				<Table.Head>capacitate_baterie</Table.Head>
				<Table.Head>putere</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as model (model.id)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{model.id}</Table.Cell>
					<Table.Cell>{model.manufacturer}</Table.Cell>
					<Table.Cell>{model.name}</Table.Cell>

					<Table.Cell>
						{#if model.batteryCapacity}
							{model.batteryCapacity}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>{model.power}</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button href="/model/{model.id}" variant="outline" size="icon">
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
