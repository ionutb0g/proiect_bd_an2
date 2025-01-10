import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: ['./src/lib/server/db/public_schema.ts'],
	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	schemaFilter: ['auth', 'public'],
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
