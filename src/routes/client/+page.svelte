<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowRight } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AddDialog from './AddDialog.svelte';
	import SortColBtn from '$lib/components/SortColBtn.svelte';

	let { data } = $props();
</script>

<header class="sticky top-0 z-10 flex items-center justify-between gap-4 bg-sidebar p-4">
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
					<SortColBtn colName="cif" colDisplay="cif_client" isPrimaryKey />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="name" colDisplay="denumire" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="vat" colDisplay="platitor_tva" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="email" colDisplay="email" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="area" colDisplay="judet" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="city" colDisplay="localitate" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="street" colDisplay="strada" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="houseNumber" colDisplay="nr_strada" />
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
