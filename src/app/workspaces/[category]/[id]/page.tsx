type WorkspacePageProps = {
  params: Promise<{
    category: string;
    id: string;
  }>;
};

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { id } = await params;

  return <main>{id}</main>;
}
