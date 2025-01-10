import { z } from 'zod';

export const formSchema = z.object({
	cif: z
		.string()
		.min(1, 'Câmpul nu poate fi gol')
		.regex(/^(\d+)?$/, 'CIF-ul este compus numai din cifre')
		.max(8, 'Valoarea este prea lungă'),
	name: z.string().trim().max(50, 'Valoarea este prea lungă'),
	vat: z.boolean().default(false),
	email: z.string().email('Email invalid'),
	area: z.string().trim().min(1, 'Câmpul nu poate fi gol').max(50, 'Valoarea este prea lungă'),
	city: z.string().trim().min(1, 'Câmpul nu poate fi gol').max(50, 'Valoarea este prea lungă'),
	street: z.string().trim().min(1, 'Câmpul nu poate fi gol').max(50, 'Valoarea este prea lungă'),
	houseNumber: z.number().gte(1, 'Valoarea nu poate fi mai mică decât 1')
});

export const updateFormSchema = formSchema.omit({ cif: true });

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
