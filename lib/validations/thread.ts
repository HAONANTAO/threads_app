// import * as z from "zod";
import { z } from "zod";
export const ThreadValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "minimun 3 characters" }),
  accountId: z.string(),
});
