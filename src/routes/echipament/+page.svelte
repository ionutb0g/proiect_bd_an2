<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowRight, Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AddDialog from './AddDialog.svelte';
	import { format } from 'date-fns';

	let { data } = $props();
</script>

<header class="sticky top-0 z-10 flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">echipament</span></h1>
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
					<span>id_echipament</span>
				</Table.Head>
				<Table.Head>nr_serie</Table.Head>
				<Table.Head>data_achizitie</Table.Head>
				<Table.Head>pret_achizitie</Table.Head>
				<Table.Head>garantie</Table.Head>
				<Table.Head>cod_model</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as equipment (equipment.id)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{equipment.id}</Table.Cell>
					<Table.Cell>{equipment.serialNumber}</Table.Cell>
					<Table.Cell>{format(equipment.purchaseDate, 'dd-MM-yyyy')}</Table.Cell>
					<Table.Cell>{equipment.purchasePrice}</Table.Cell>
					<Table.Cell>
						{#if equipment.warranty}
							<span>{equipment.warranty}</span>
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>
						<div class="flex items-center gap-2">
							<span> {equipment.modelId} </span>
							<Button href="/model/{equipment.modelId}" variant="ghost" size="icon">
								<ArrowRight />
							</Button>
						</div>
					</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button href="/echipament/{equipment.id}" variant="outline" size="icon">
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
