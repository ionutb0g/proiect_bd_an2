<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowRight, Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AddDialog from './AddDialog.svelte';

	let { data } = $props();
</script>

<header class="flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">canale_configurari</span></h1>
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
				<Table.Head>
					<div class="inline-flex items-center gap-1 text-primary">
						<Key size={14} />
						<span>cod_configurare</span>
					</div>
				</Table.Head>
				<Table.Head>
					<div class="inline-flex items-center gap-1 text-primary">
						<Key size={14} />
						<span>cod_canal</span>
					</div>
				</Table.Head>
				<Table.Head>pozitie</Table.Head>
				<Table.Head>denumire</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as configChnls (configChnls.configurationId.toString() + '_' + configChnls.channelId.toString())}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{configChnls.configurationId}</Table.Cell>
					<Table.Cell class="font-medium text-primary">{configChnls.channelId}</Table.Cell>
					<Table.Cell>{configChnls.position}</Table.Cell>
					<Table.Cell>{configChnls.name}</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button
							href="/canale_configurari/{configChnls.configurationId.toString() +
								'_' +
								configChnls.channelId.toString()}"
							variant="outline"
							size="icon"
						>
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
