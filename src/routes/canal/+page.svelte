<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ArrowRight, Key } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AddDialog from './AddDialog.svelte';

	let { data } = $props();
</script>

<header class="sticky top-0 z-10 flex items-center justify-between gap-4 bg-sidebar p-4">
	<div class="flex items-center gap-4">
		<Sidebar.Trigger></Sidebar.Trigger>
		<h1 class="text-xl font-bold">Tabel: <span class="text-primary">canal</span></h1>
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
					<span>id_canal</span>
				</Table.Head>
				<Table.Head>frecventa</Table.Head>
				<Table.Head>digital</Table.Head>
				<Table.Head>criptat</Table.Head>
				<Table.Head class="text-right">Acțiuni</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.result as channel (channel.id)}
				<Table.Row>
					<Table.Cell class="font-medium text-primary">{channel.id}</Table.Cell>
					<Table.Cell>{channel.frequency}</Table.Cell>
					<Table.Cell>{channel.digital ? 'DA' : 'Nu'}</Table.Cell>
					<Table.Cell>{channel.encrypted ? 'DA' : 'Nu'}</Table.Cell>
					<Table.Cell class="flex w-full items-end justify-end gap-2">
						<Button href="/canal/{channel.id}" variant="outline" size="icon">
							<ArrowRight />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
