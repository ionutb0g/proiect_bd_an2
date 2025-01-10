import { z } from 'zod';

export const formSchema = z.object({
	configurationId: z.number().int(),
	channelId: z.number().int(),
	position: z
		.number()
		.int('Valoarea trebuie să fie întregă')
		.gt(0, 'Valoarea trebuie să fie strict pozitivă'),
	name: z.string().trim().min(1).max(15, 'Valoarea este prea lungă')
});

export const updateFormSchema = formSchema;

export type FormSchema = typeof formSchema;
export type UpdateFormSchema = typeof updateFormSchema;
