import { z } from 'zod';

export const formSchema = z.object({
	cnp: z.string().regex(/^[1-8]\d{12}$/, 'CNP ul nu este valid'),
	firstName: z.string().trim().min(1, 'Câmpul nu poate fi gol').max(50, 'Valoarea este prea lungă'),
	lastName: z.string().trim().min(1, 'Câmpul nu poate fi gol').max(50, 'Valoarea este prea lungă'),
	hireDate: z.string().date(),
	phoneNumber: z.string().regex(/^\+?\d{10,}$/, 'Numărul de telefon nu este valid'),
	salary: z.number().gt(0, 'Salariul trebuie să fie strict pozitiv')
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
