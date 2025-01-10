import { z } from 'zod';

export const formSchema = z.object({
	orderId: z.number().int(),
	configurationId: z.number().int(),
	price: z.number().step(0.01).gt(0, 'Valoarea trebuie să fie strict pozitivă')
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
