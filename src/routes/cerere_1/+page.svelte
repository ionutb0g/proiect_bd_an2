<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { format } from 'date-fns';

	let { data } = $props();
</script>

<header class="sticky top-0 z-10 flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">
			Cerere 1: <span class="text-primary">{data.result.length} rezultate</span>
		</h1>
	</div>
	<div class="flex items-center gap-2">
		<!-- <Button variant="outline">Sortare</Button> -->
	</div>
</header>

<div class="p-4">
	<h2 class="text-lg font-semibold">Cerință</h2>
	<p class="max-w-4xl text-sm">
		Să se afișeze seria echipamentului, numele și prenumele tehnicianului, momentul și codul
		configurării, pentru fieacre configurare efectuată pe un echipament mai scump de 1500 lei ce
		încă se află în garanție.
	</p>
</div>

<div class="m-8 flex flex-col overflow-hidden rounded-lg border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>cod_configurare</Table.Head>
				<Table.Head>moment_configurare</Table.Head>
				<Table.Head>prenume_tehnician</Table.Head>
				<Table.Head>nume_tehnician</Table.Head>
				<Table.Head>serie_echipament</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as row (row.id)}
				<Table.Row>
					<Table.Cell class="font-medium">{row.id}</Table.Cell>
					<Table.Cell>{format(row.createdAt, 'dd.MM.yyyy HH:mm:ss')}</Table.Cell>
					<Table.Cell>
						{#if row.firstName}
							{row.firstName}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>
						{#if row.lastName}
							{row.lastName}
						{:else}
							<span class="text-xs font-bold text-muted-foreground">NULL</span>
						{/if}
					</Table.Cell>
					<Table.Cell>{row.equipmentSerialNumber}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
