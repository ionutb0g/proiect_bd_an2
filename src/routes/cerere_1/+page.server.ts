import { db } from '$lib/server/db';
import { configuration, equipment, technician } from '$lib/server/db/public_schema';
import { and, eq, gt, sql } from 'drizzle-orm';

export async function load() {
	const query = db
		.select({
			id: configuration.id,
			createdAt: configuration.createdAt,
			firstName: technician.firstName,
			lastName: technician.lastName,
			equipmentSerialNumber: equipment.serialNumber
		})
		.from(configuration)
		.leftJoin(equipment, eq(equipment.id, configuration.equipmentId))
		.leftJoin(technician, eq(technician.id, configuration.technicianId))
		.where(
			and(
				gt(equipment.purchasePrice, (1500).toFixed(2)),
				sql`(${equipment.purchaseDate} + make_interval(months => coalesce(${equipment.warranty}, 0))) > now()::date`
			)
		);

	const result = await query;

	return { result };
}
