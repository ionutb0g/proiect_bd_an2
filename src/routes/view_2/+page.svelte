<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';

	let { data } = $props();
</script>

<header class="sticky top-0 z-10 flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">
			Vizualizare: <span class="text-primary">total_comenzi</span>
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
					<span>id_comanda</span>
				</Table.Head>
				<Table.Head>denumire_client</Table.Head>
				<Table.Head>zile_inchiriate</Table.Head>
				<Table.Head>total</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as order (order.orderId)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{order.orderId}</Table.Cell>

					<Table.Cell>
						{#if order.customerName}
							{order.customerName}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>

					<Table.Cell>{order.orderedDays}</Table.Cell>

					<Table.Cell>
						{#if order.total}
							{order.total}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
