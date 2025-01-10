<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Table2 } from 'lucide-svelte/icons';
	import '../app.css';
	let { children } = $props();

	const tables = [
		{ name: 'client', url: '/client' },
		{ name: 'model', url: '/model' },
		{ name: 'echipament', url: '/echipament' },
		{ name: 'tehnician', url: '/tehnician' },
		{ name: 'canal', url: '/canal' },
		{ name: 'configurare', url: '/configurare' },
		{ name: 'canale_configurari', url: '/canale_configurari' },
		{ name: 'comanda', url: '/comanda' },
		{ name: 'configurari_comandate', url: '/configurari_comandate' }
	];

	const views = [
		{ name: 'compusa', url: '/view_1' },
		{ name: 'complexa', url: '/view_2' }
	];

	const queries = [
		{ name: 'Cerere 1', url: '/cerere_1' },
		{ name: 'Cerere 2', url: '/cerere_2' }
	];
</script>

<Toaster position="bottom-left" />

<Sidebar.Provider>
	<Sidebar.Root>
		<Sidebar.Header></Sidebar.Header>
		<Sidebar.Content class="gap-y-4">
			<Sidebar.Group>
				<Sidebar.GroupLabel>TABELE</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each tables as table}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={table.url} {...props}>
											<Table2 />
											<span>{table.name}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			<Sidebar.Group>
				<Sidebar.GroupLabel>VIZUALIZĂRI</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each views as view}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={view.url} {...props}>
											<Table2 />
											<span>{view.name}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
			<Sidebar.Group>
				<Sidebar.GroupLabel>INTEROGĂRI</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each queries as query}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={query.url} {...props}>
											<Table2 />
											<span>{query.name}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>
	<main class="w-full">
		{@render children()}
	</main>
</Sidebar.Provider>
