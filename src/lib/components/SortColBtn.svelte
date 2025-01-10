<script lang="ts">
	import { ArrowDown, ArrowUp, Key } from 'lucide-svelte';
	import { Button } from './ui/button';

	interface Props {
		tableName: string;
		colDisplay: string;
		colName: string;
		sortColumn: string | null;
		sortDirection: 'asc' | 'desc';
		isPrimaryKey?: boolean;
	}

	let {
		tableName,
		colDisplay,
		colName,
		sortColumn,
		sortDirection,
		isPrimaryKey = false
	}: Props = $props();
</script>

<Button
	variant="ghost"
	href="/{tableName}?order_by={colName}&order_direction={sortDirection === 'desc' ? 'asc' : 'desc'}"
>
	{#if isPrimaryKey}
		<Key size={14} />
	{/if}
	<span>{colDisplay}</span>
	{#if sortColumn === colName}
		{#if sortDirection === 'desc'}
			<ArrowDown size={14} />
		{:else}
			<ArrowUp size={14} />
		{/if}
	{/if}
</Button>
