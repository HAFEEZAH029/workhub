import { createClient } from "@/lib/supabase/server";
import { Workspace, WorkspaceImage, workspace, WorkspaceAmenity } from "@/types/workspace";
import { BookingDate } from "@/types/booking";

async function getSupabaseClient() {
    return createClient();
}

export const getCategories = async () => {
    const supabase = await getSupabaseClient();
    const {data, error} = await supabase.from('workspace_categories').select('*');

    if (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
    };

    return data;
};

export const getCategoryBySlug = async (category:string) => {
    const supabase = await getSupabaseClient();
    const {data, error} = await supabase.from('workspace_categories').select('*').eq("slug", category).single();

    if (error) {
        throw new Error(`Error fetching category: ${error.message}`);
    };

    return data;
};

export const getCategoryById = async (workspaceID:string) => {
   const supabase = await getSupabaseClient();
   const {data, error} = await supabase
                        .from("workspace_categories")
                        .select('*')
                        .eq("id", workspaceID)
                        .single();
        if (error) {
            throw new Error(`Error fetching category: ${error.message}`);
        }
    return data;

}

export const getWorkspaces = async (categoryId:string) => {
    const supabase = await getSupabaseClient();
    const {data, error} = await supabase.from('workspaces').select('*').eq("category_id", categoryId);

    if (error) {
        throw new Error(`Error fetching workspaces: ${error.message}`);
    };

    const workspaces = data as Workspace[];

    if (workspaces.length === 0) {
        return workspaces;
    }

    const workspaceIds = workspaces.map((workspace) => workspace.id);
    const {data: images, error: imageError} = await supabase
        .from('workspace_images')
        .select('*')
        .in('workspace_id', workspaceIds);

    if (imageError) {
        throw new Error(`Error fetching workspace images: ${imageError.message}`);
    };

    const imagesByWorkspace = (images as WorkspaceImage[]).reduce<Record<string, WorkspaceImage[]>>((acc, image) => {
        acc[image.workspace_id] = [...(acc[image.workspace_id] || []), image];
        return acc;
    }, {});

    return workspaces.map((workspace) => ({
        ...workspace,
        workspace_images: imagesByWorkspace[workspace.id] || [],
    }));
};

export const getWorkspaceBySlug = async (Slug:string): Promise<workspace> => {
   const supabase = await getSupabaseClient();
   const {data: workspace, error} = await supabase
   .from("workspaces")
   .select(`
     *,
      workspace_images(*),
      workspace_amenities(
        amenities(*)
      )
    `)
    .eq("slug", Slug)
    .single();

    if (error) {
        throw new Error (`Error fetching workspace: ${error?.message}`)
    };


    return {
        ...workspace,
        workspace_amenities: workspace.workspace_amenities.map(
           (item: WorkspaceAmenity) => item.amenities
        ),
    };
};

export const getWorkspaceBookingsByID = async (ID:string): Promise<BookingDate[]> => {
    const supabase = await getSupabaseClient();
    const {data, error} = await supabase
                         .from("bookings")
                         .select('booking_date')
                         .eq("workspace_id", ID)
                         .in("status", ["active", "upcoming"]);

    if (error) {
        throw new Error(`Could not fetch booking dates: ${error.message}`)
    };

    return data;

};

