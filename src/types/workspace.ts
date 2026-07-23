export type Workspace = {
  id: string;
  category_id?: string;
  name: string;
  slug: string;
  capacity_min:number;
  capacity_max:number;
  hourly_rate: number;
  daily_base_price?: number | null;
  code:string;
  workspace_type?: string | null;
  location_label?: string | null;
  workspace_images?: WorkspaceImage[];
};

export type workspace = {
  id: string;
  category_id?: string;
  name: string;
  slug: string;
  capacity_min:number;
  capacity_max:number;
  description:string;
  hourly_rate: number;
  daily_base_price?: number | null;
  code:string;
  workspace_type?: string | null;
  location_label?: string | null;
  workspace_images?: WorkspaceImage[];
  workspace_amenities: amenities[];
};

type amenities = {
  id:string;
  name:string;
  icon:string
}

export type WorkspaceAmenity = {
  amenities: amenities;
};

export type WorkspaceImage = {
  id: string;
  workspace_id: string;
  image_path?: string | null;
  alt_text?: string | null;
  is_primary?: boolean | null;
};

export type ComponentLayoutProps = {
  workspaces: Workspace[];

  selectedWorkspace: Workspace | null;

  onWorkspaceSelect: (workspace: Workspace) => void;

  onViewDetails: (slug:string) => void;

  onBookNow: (workspace: Workspace) => void;
};
