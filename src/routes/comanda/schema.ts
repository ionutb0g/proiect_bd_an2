import { z } from 'zod';

export const formSchema = z.object({
	paymentMethod: z.enum(['numerar', 'transfer_bancar']).default('transfer_bancar'),
	startedAt: z.string().date(),
	endedAt: z.string().date().optional().nullable(),
	discount: z.number().step(0.01).gt(0).lt(1).optional().nullable(),
	damageCost: z.number().step(0.01).gt(0).optional().nullable(),
	customerCui: z.string().optional().nullable()
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
