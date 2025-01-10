import { eq, sql } from 'drizzle-orm';
import {
	boolean,
	char,
	date,
	integer,
	numeric,
	pgEnum,
	pgTable,
	pgView,
	primaryKey,
	smallint,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

export const customer = pgTable('client', {
	cif: numeric('cif_client', { precision: 8 }).primaryKey(),
	name: varchar('denumire', { length: 50 }).notNull().unique(),
	vat: boolean('platitor_tva').notNull(),
	email: varchar('email', { length: 254 }).notNull().unique(),
	area: varchar('judet', { length: 50 }).notNull(),
	city: varchar('localitate', { length: 50 }).notNull(),
	street: varchar('strada', { length: 50 }).notNull(),
	houseNumber: integer('numar_stradal').notNull()
});

export const model = pgTable('model', {
	id: integer('id_model').primaryKey().generatedAlwaysAsIdentity(),
	manufacturer: varchar('producator', { length: 50 }).notNull(),
	name: varchar('denumire', { length: 20 }).notNull(),
	batteryCapacity: integer('capacitate_baterie'),
	power: numeric('putere', { precision: 6, scale: 1 }).notNull()
});

export const equipment = pgTable('echipament', {
	id: integer('id_echipament').primaryKey().generatedAlwaysAsIdentity(),
	serialNumber: varchar('nr_serie', { length: 20 }).primaryKey(),
	purchaseDate: date('data_achizitie').notNull().defaultNow(),
	purchasePrice: numeric('pret_achizitie', { precision: 10, scale: 2 }).notNull(),
	warranty: smallint('garantie'),
	modelId: integer('cod_model')
		.notNull()
		.references(() => model.id)
});

export const technician = pgTable('tehnician', {
	id: integer('id_tehnician').primaryKey().generatedAlwaysAsIdentity(),
	cnp: char('cnp', { length: 13 }).notNull().unique(),
	firstName: varchar('prenume', { length: 50 }).notNull(),
	lastName: varchar('nume', { length: 50 }).notNull(),
	hireDate: date('data_angajare').notNull().defaultNow(),
	phoneNumber: varchar('numar_telefon', { length: 15 }).notNull().unique(),
	salary: numeric('salariu', { precision: 10, scale: 2 }).notNull()
});

export const channel = pgTable('canal', {
	id: integer('id_canal').primaryKey().generatedAlwaysAsIdentity(),
	frequency: numeric('frecventa', { precision: 9, scale: 6 }).notNull(),
	digital: boolean('digital').notNull().default(false),
	encrypted: boolean('criptat').notNull().default(false)
});

export const powerValue = pgEnum('valoare_putere', ['low', 'high']);

export const configuration = pgTable('configurare', {
	id: integer('id_configurare').primaryKey().generatedAlwaysAsIdentity(),
	createdAt: timestamp('moment_configurare', { withTimezone: true }).notNull().defaultNow(),
	power: powerValue('putere').notNull().default('low'),
	priority: smallint('prioritate').notNull().default(0),
	equipmentId: integer('cod_echipament')
		.notNull()
		.references(() => equipment.id),
	technicianId: integer('cod_tehnician').references(() => technician.id)
});

export const configurationChannels = pgTable(
	'canale_configurari',
	{
		configurationId: integer('cod_configurare')
			.notNull()
			.references(() => configuration.id),
		channelId: integer('cod_canal')
			.notNull()
			.references(() => channel.id),
		name: varchar('denumire', { length: 15 }).notNull(),
		position: smallint('pozitie_canal').notNull()
	},
	(t) => ({ pk: primaryKey({ columns: [t.channelId, t.configurationId] }) })
);

export const paymentMethodValue = pgEnum('valoare_metoda_plata', ['numerar', 'transfer_bancar']);

export const order = pgTable('comanda', {
	id: integer('id_comanda').primaryKey().generatedAlwaysAsIdentity(),
	paymentMethod: paymentMethodValue('metoda_plata').notNull(),
	startedAt: date('data_inchiriere').notNull().defaultNow(),
	endedAt: date('data_returnare'),
	discount: numeric('discount', { precision: 2, scale: 2 }),
	damageCost: numeric('cost_daune', { precision: 10, scale: 2 }),
	customerCui: numeric('cif_client', { precision: 8 }).references(() => customer.cif)
});

export const orderedConfiguration = pgTable(
	'configurari_comandate',
	{
		orderId: integer('cod_comanda')
			.notNull()
			.references(() => order.id),
		configurationId: integer('cod_configurare')
			.notNull()
			.references(() => configuration.id),
		price: numeric('pret', { precision: 10, scale: 2 }).notNull()
	},
	(t) => ({ pk: primaryKey({ columns: [t.orderId, t.configurationId] }) })
);

export const detailedEquipment = pgView('echipamente_detaliate').as((qb) =>
	qb.select().from(equipment).leftJoin(model, eq(equipment.modelId, model.id))
);

export const orderTotal = pgView('total_comenzi', {
	orderId: integer('id_comanda'),
	customerName: varchar('denumire_client'),
	orderedDays: integer('zile_inchiriate'),
	total: numeric('total')
}).as(sql``);
