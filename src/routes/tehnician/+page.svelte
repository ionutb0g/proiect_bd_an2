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
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">tehnician</span></h1>
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
				<Table.Head class="text-primary">
					<SortColBtn colName="id" colDisplay="id_tehnician" isPrimaryKey />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="cnp" colDisplay="cnp" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="firstName" colDisplay="prenume" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="lastName" colDisplay="nume" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="phoneNumber" colDisplay="numar_telefon" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="hireDate" colDisplay="data_angajare" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="salary" colDisplay="salariu" />
				</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as technician (technician.id)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{technician.id}</Table.Cell>
					<Table.Cell>{technician.cnp}</Table.Cell>
					<Table.Cell>{technician.firstName}</Table.Cell>
					<Table.Cell>{technician.lastName}</Table.Cell>
					<Table.Cell>{technician.phoneNumber}</Table.Cell>
					<Table.Cell>{format(technician.hireDate, 'dd-MM-yyyy')}</Table.Cell>
					<Table.Cell>{technician.salary}</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button href="/tehnician/{technician.id}" variant="outline" size="icon">
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
