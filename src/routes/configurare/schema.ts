import { z } from 'zod';

export const formSchema = z.object({
	createdAt: z.string().trim().datetime({ local: true }).nullable(),
	power: z.enum(['low', 'high']).default('low'),
	priority: z
		.number()
		.int('Valoarea trebuie să fie întregă')
		.gte(0, 'Valoarea este prea mică')
		.lte(2, 'Valoarea este prea mare'),
	equipmentId: z.number().int(),
	technicianId: z.number().int().nullable()
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
