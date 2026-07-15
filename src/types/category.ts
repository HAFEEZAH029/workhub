export type workspacecategory = {
    id: string;
    slug: string;
    name: string;
    description: string;
    booking_type: string;
    cover_image_path: string;
    gallery_image_path: string;
}

export type categoryinfo = {
    data: workspacecategory;
    title: string;
    label: string;
    capacity: string;
    price_range: string;
    reverse: boolean;
}

export type categoryconfig = Record<string, {
        title: string;
        label: string;
        capacity: string;
        price_range: string;
    }>