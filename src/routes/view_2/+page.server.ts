import { db } from '$lib/server/db';
import { orderTotal } from '$lib/server/db/public_schema';

export async function load() {
	const result = await db.select().from(orderTotal);

	return { result };
}
