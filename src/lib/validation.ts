import { z } from 'zod';

export const studentApproveFormScheam = z.object({
	date: z.string().min(1, {
		message: 'Required date ',
	}),
	time: z.string().min(1, {
		message: 'Required time',
	}),
});
