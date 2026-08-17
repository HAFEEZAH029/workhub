"use server";

import { createClient } from "@/lib/supabase/server";
import { contactInput, contactSchema } from "../validation/contact";
import type { ActionResponse } from "@/types/action-response"

export async function createContactMessage (dataForm:contactInput): Promise<ActionResponse> {
    const supabase = await createClient();

    const safeValues = contactSchema.safeParse(dataForm)

    if (!safeValues.success) {
        return {success:false, errors:safeValues.error.flatten().fieldErrors}
    }

    const {error} = await supabase
                          .from("contact_messages")
                          .insert({
                            full_name: safeValues.data.fullName,
                            email:  safeValues.data.workEmail,
                            subject:  safeValues.data.subject,
                            message:  safeValues.data.message,
                          })

        if (error) {
            return {
                success:false,
                message: error.message
            }
        }

    return {success: true};
}