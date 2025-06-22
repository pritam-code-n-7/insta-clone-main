import z from "zod";

export const UpdateSchema = z.object({
    id:z.string(),
    caption: z.string().min(3, {message: "Caption must be atleast 3 character long."})
})