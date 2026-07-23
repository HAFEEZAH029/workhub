import { ComponentType } from 'react';
import { ComponentLayoutProps } from './workspace';

export type workspacecategory = {
    id: string;
    slug: string;
    name: string;
    description: string;
    booking_type: string;
    cover_image_path: string;
    gallery_image_path: string;
}

export type slugCategory = {
  name: string,
  booking_type: string,
  slug:string;
  alt_description: string;
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

import { Component } from "react";
import { Workspace } from "./workspace";

export type filterconfig = Record<string, {
        filters: string[] | null;
        filterKey: keyof Workspace | null;
}>

export type FloorType = "phone-booths" | "hot-desks" | "meeting-rooms" | "private-offices";

export type floorconfig = Record<FloorType, {
    component: ComponentType<ComponentLayoutProps>;
}>
