import { z } from 'zod';

export const formSchema = z.object({
	frequency: z
		.number()
		.step(0.000001, 'Valoarea are prea multe zecimale')
		.gte(400, 'Valoarea este prea mică')
		.lte(470, 'Valoarea este prea mare'),
	digital: z.boolean().default(false),
	encrypted: z.boolean().default(false)
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
