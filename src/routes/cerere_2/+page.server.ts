import { db } from '$lib/server/db';
import { order, orderedConfiguration, configurationChannels } from '$lib/server/db/public_schema';
import { and, count, countDistinct, eq, gte } from 'drizzle-orm';

export async function load() {
	const query = db
		.select({
			id: order.id,
			startedAt: order.startedAt,
			configsCount: countDistinct(orderedConfiguration.configurationId),
			channelsCount: countDistinct(configurationChannels.channelId)
		})
		.from(order)
		.leftJoin(orderedConfiguration, eq(orderedConfiguration.orderId, order.id))
		.leftJoin(
			configurationChannels,
			eq(configurationChannels.configurationId, orderedConfiguration.configurationId)
		)
		.groupBy(order.id)
		.having(gte(countDistinct(configurationChannels.channelId), 4));

	const result = await query;

	return { result };
}
