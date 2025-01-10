<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { format } from 'date-fns';

	let { data } = $props();
</script>

<header class="flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">
			Cerere 2: <span class="text-primary">{data.result.length} rezultate</span>
		</h1>
	</div>
	<div class="flex items-center gap-2">
		<!-- <Button variant="outline">Sortare</Button> -->
	</div>
</header>

<div class="p-4">
	<h2 class="text-lg font-semibold">Cerință</h2>
	<p class="max-w-4xl text-sm">
		Să se afișeze codul comenzii, data închirierii, numărul total de configurări închiriate, și
		numărul total de canale folosite pentru fiecare comandă ce folosește 4 canale sau mai mult.
	</p>
</div>

<div class="m-8 flex flex-col overflow-hidden rounded-lg border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>cod_comanda</Table.Head>
				<Table.Head>data_inchiriere</Table.Head>
				<Table.Head>configurari_folosite</Table.Head>
				<Table.Head>canale_folosite</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as row (row.id)}
				<Table.Row>
					<Table.Cell class="font-medium">{row.id}</Table.Cell>
					<Table.Cell>{format(row.startedAt, 'dd.MM.yyyy')}</Table.Cell>
					<Table.Cell>{row.configsCount}</Table.Cell>
					<Table.Cell>{row.channelsCount}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
