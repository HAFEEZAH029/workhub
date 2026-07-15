import { createClient } from "@/lib/supabase/server";

export const getCategories = async () => {
    const supabase = await createClient();

    const {data, error} = await supabase.from('workspace_categories').select('*');

    if (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
    };

    return data;
}