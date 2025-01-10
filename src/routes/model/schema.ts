import { z } from 'zod';

export const formSchema = z.object({
	// id: z.number().int(),
	manufacturer: z.string().min(1, 'Câmpul nu poate fi gol').max(50, 'Valoarea este prea lungă'),
	name: z.string().min(1, 'Câmpul nu poate fi gol').max(20, 'Valoarea este prea lungă'),
	batteryCapacity: z.number().int().gt(0).nullable(),
	power: z
		.number()
		.gt(0, 'Valoarea trebuie să fie strict pozitivă')
		.step(0.1, 'Valoarea are prea multe zecimale')
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
