import {z} from "zod";

export const contactSchema = z.object({
    fullName: z.string().min(4, "Full name must be at least 4 characters"),
    workEmail: z.string().email("Please enter a valid email address"),
    subject: z.enum(["General enquiry", "Sales","Support", "Patnership", "Other"],
            { message: "Please select a valid subject"} ),
    message: z.string().min(15, "Please be detailed with your message"),
});

export type contactInput = z.infer<typeof contactSchema>;