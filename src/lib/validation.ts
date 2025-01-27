import { z } from "zod";

const isDateInThePast = (dateString: any) => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today;
};

export const studentApproveFormScheam = z.object({
  date: z
    .string()
    .min(1, {
      message: "Required date",
    })
    .refine((date) => !isDateInThePast(date), {
      message: "Date cannot be in the past",
    }),
  time: z.string().min(1, {
    message: "Required time",
  }),
});
