import { z } from 'zod';

export const formSchema = z.object({
	serialNumber: z.string().trim().max(20, 'Valoarea este prea lungă'),
	purchaseDate: z.string().date('Data invalida'),
	purchasePrice: z
		.number()
		.step(0.01, 'Valoarea are prea multe zecimale')
		.gt(0, 'Valoarea trebuie să fie strict pozitivă'),
	warranty: z.number().nullable(),
	modelId: z
		.number()
		.int('Valoarea este un număr întreg')
		.gte(1, 'Valoarea nu poate fi mai mică decât 1')
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
