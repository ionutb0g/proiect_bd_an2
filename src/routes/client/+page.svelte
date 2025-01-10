<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowDown, ArrowRight, ArrowUp, Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AddDialog from './AddDialog.svelte';
	import SortColBtn from '$lib/components/SortColBtn.svelte';

	let { data } = $props();
	let { sortColumn } = $derived(data);
	let sortDirection: 'desc' | 'asc' = $derived(data.sortDirection === 'desc' ? 'desc' : 'asc');
</script>

<header class="flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">client</span></h1>
	</div>
	<div class="flex items-center gap-2">
		<AddDialog addForm={data.addForm} />
	</div>
</header>

<div class="m-8 flex flex-col overflow-hidden rounded-lg border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="text-primary">
					<SortColBtn
						tableName="client"
						colName="cif"
						colDisplay="cif_client"
						{sortColumn}
						{sortDirection}
						isPrimaryKey
					/>
				</Table.Head>
				<Table.Head>
					<SortColBtn
						tableName="client"
						colName="name"
						colDisplay="denumire"
						{sortColumn}
						{sortDirection}
					/>
				</Table.Head>
				<Table.Head>
					<SortColBtn
						tableName="client"
						colName="vat"
						colDisplay="platitor_tva"
						{sortColumn}
						{sortDirection}
					/>
				</Table.Head>
				<Table.Head>
					<SortColBtn
						tableName="client"
						colName="email"
						colDisplay="email"
						{sortColumn}
						{sortDirection}
					/>
				</Table.Head>
				<Table.Head>
					<SortColBtn
						tableName="client"
						colName="area"
						colDisplay="judet"
						{sortColumn}
						{sortDirection}
					/>
				</Table.Head>
				<Table.Head>
					<SortColBtn
						tableName="client"
						colName="city"
						colDisplay="localitate"
						{sortColumn}
						{sortDirection}
					/>
				</Table.Head>
				<Table.Head>
					<SortColBtn
						tableName="client"
						colName="street"
						colDisplay="strada"
						{sortColumn}
						{sortDirection}
					/>
				</Table.Head>
				<Table.Head>
					<SortColBtn
						tableName="client"
						colName="houseNumber"
						colDisplay="nr_stradal"
						{sortColumn}
						{sortDirection}
					/>
				</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as customer (customer.cif)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{customer.cif}</Table.Cell>
					<Table.Cell>{customer.name}</Table.Cell>
					<Table.Cell>{customer.vat ? 'DA' : 'Nu'}</Table.Cell>
					<Table.Cell>{customer.email}</Table.Cell>
					<Table.Cell>{customer.area}</Table.Cell>
					<Table.Cell>{customer.city}</Table.Cell>
					<Table.Cell>{customer.street}</Table.Cell>
					<Table.Cell>{customer.houseNumber}</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button href="/client/{customer.cif}" variant="outline" size="icon">
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
