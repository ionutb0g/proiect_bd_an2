<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowRight, Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AddDialog from './AddDialog.svelte';
	import { format } from 'date-fns';
	import SortColBtn from '$lib/components/SortColBtn.svelte';

	let { data } = $props();
</script>

<header class="sticky top-0 z-10 flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">comanda</span></h1>
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
					<SortColBtn colName="id" colDisplay="id_comanda" isPrimaryKey />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="paymentMethod" colDisplay="metoda_plata" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="startedAt" colDisplay="data_inchiriere" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="endedAt" colDisplay="data_returnare" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="discount" colDisplay="discount" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="damageCost" colDisplay="cost_daune" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="customerCui" colDisplay="cif_client" />
				</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as order (order.id)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{order.id}</Table.Cell>
					<Table.Cell>{order.paymentMethod}</Table.Cell>
					<Table.Cell>
						{format(order.startedAt, 'dd-MM-yyyy')}
					</Table.Cell>
					<Table.Cell>
						{#if order.endedAt}
							{format(order.endedAt, 'dd-MM-yyyy')}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>
						{#if order.discount}
							{parseInt(order.discount.slice(2))}%
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>
						{#if order.damageCost}
							{order.damageCost}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>
						{#if order.customerCui}
							{order.customerCui}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button href="/comanda/{order.id}" variant="outline" size="icon">
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
