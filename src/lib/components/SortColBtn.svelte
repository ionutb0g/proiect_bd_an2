<script lang="ts" module>
	const directions = [null, 'asc', 'desc'] as const;
</script>

<script lang="ts">
	import { ArrowDown, ArrowUp, Key } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { page } from '$app/state';

	interface Props {
		colDisplay: string;
		colName: string;
		isPrimaryKey?: boolean;
	}

	let { colDisplay, colName, isPrimaryKey = false }: Props = $props();

	const [path, dir] = $derived.by(() => {
		const newUrl = new URL(page.url);
		let orderByDirection: string | null = null;

		let found = false;
		for (const [key, value] of page.url.searchParams) {
			if (key === 'order_by' && value.startsWith(colName + '_')) {
				newUrl.searchParams.delete('order_by', value);
				[, orderByDirection] = value.split('_');
				found = true;
			}
		}
		let newDirection = !found ? 'asc' : orderByDirection === 'asc' ? 'desc' : null;

		if (newDirection) {
			newUrl.searchParams.append('order_by', `${colName}_${newDirection}`);
		}

		return [newUrl.pathname + newUrl.search, orderByDirection];
	});
</script>

<Button variant="ghost" href={path}>
	{#if isPrimaryKey}
		<Key size={14} />
	{/if}
	<span>{colDisplay}</span>

	{#if dir}
		{#if dir === 'asc'}
			<ArrowDown size={14} />
		{:else if dir === 'desc'}
			<ArrowUp size={14} />
		{/if}
	{/if}
</Button>
