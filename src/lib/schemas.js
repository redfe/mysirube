import { z } from 'zod';

export const dataSchema = z.object({
	id: z.string().uuid(),
	unitLevel: z.number(),
	startDate: z.date(),
	endDate: z.string().datetime().optional(),
	tags: z.array(z.string()).min(1).max(5),
	content: z.string()
});
