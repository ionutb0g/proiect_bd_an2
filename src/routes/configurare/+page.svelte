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
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">configurare</span></h1>
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
					<SortColBtn colName="id" colDisplay="id_configurare" isPrimaryKey />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="createdAt" colDisplay="moment_configurare" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="power" colDisplay="putere" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="priority" colDisplay="prioritate" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="equipmentId" colDisplay="cod_echipament" />
				</Table.Head>
				<Table.Head>
					<SortColBtn colName="technicianId" colDisplay="cod_tehnician" />
				</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as configuration (configuration.id)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{configuration.id}</Table.Cell>
					<Table.Cell>
						{format(configuration.createdAt, 'dd-MM-yyyy hh:mm:ss')}
					</Table.Cell>
					<Table.Cell>{configuration.power}</Table.Cell>
					<Table.Cell>{configuration.priority}</Table.Cell>
					<Table.Cell>
						<div class="flex items-center gap-2">
							<span> {configuration.equipmentId} </span>
							<Button href="/echipament/{configuration.equipmentId}" variant="ghost" size="icon">
								<ArrowRight />
							</Button>
						</div>
					</Table.Cell>
					<Table.Cell>
						{#if configuration.technicianId}
							<div class="flex items-center gap-2">
								<span> {configuration.technicianId} </span>
								<Button href="/tehnician/{configuration.technicianId}" variant="ghost" size="icon">
									<ArrowRight />
								</Button>
							</div>
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button href="/configurare/{configuration.id}" variant="outline" size="icon">
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
