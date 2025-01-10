<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowRight, Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';

	import { format } from 'date-fns';

	let { data } = $props();
</script>

<header class="flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">
			Vizualizare: <span class="text-primary">echipamente_detaliate</span>
		</h1>
	</div>
	<div class="flex items-center gap-2">
		<!-- <Button variant="outline">Sortare</Button>
		<AddDialog addForm={data.addForm} /> -->
	</div>
</header>

<div class="m-8 flex flex-col overflow-hidden rounded-lg border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="flex items-center gap-1 text-primary">
					<Key size={14} />
					<span>id_echipament</span>
				</Table.Head>
				<Table.Head>nr_serie</Table.Head>
				<Table.Head>data_achizitie</Table.Head>
				<Table.Head>pret_achizitie</Table.Head>
				<Table.Head>garantie</Table.Head>
				<Table.Head>producator</Table.Head>
				<Table.Head>denumire_model</Table.Head>
				<Table.Head>capacitate_baterie</Table.Head>
				<Table.Head>putere</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as { echipament: e, model: m } (e.id)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{e.id}</Table.Cell>
					<Table.Cell>{e.serialNumber}</Table.Cell>
					<Table.Cell>{format(e.purchaseDate, 'dd-MM-yyyy')}</Table.Cell>
					<Table.Cell>{e.purchasePrice}</Table.Cell>
					<Table.Cell>
						{#if e.warranty}
							<span>{e.warranty}</span>
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>{m.manufacturer}</Table.Cell>
					<Table.Cell>{m.name}</Table.Cell>
					<Table.Cell>{m.batteryCapacity}</Table.Cell>
					<Table.Cell>{m.power}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
