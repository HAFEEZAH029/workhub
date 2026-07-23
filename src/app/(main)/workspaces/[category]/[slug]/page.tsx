import StickyHeader from "@/components/details/StickyHeader";
import { getWorkspaceBySlug } from "@/lib/db/data-query";
import ImageSlider from "@/components/details/ImageSlider";
import AboutWorkspace from "@/components/details/AboutWorkspace";
import AmenitiesAndBookingRules from "@/components/details/AmenitiesandBookingrules";
import { Suspense } from "react";

type WorkspacePageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

async function Details ({slug}: {slug:string}) {

  const workspace = await getWorkspaceBySlug(slug);
   
  return (
    <main className="mx-auto mt-10 max-w-7xl space-y-7 px-5 sm:px-5 md:px-8 lg:px-5">
      <StickyHeader workspace={workspace} />
      <ImageSlider workspace={workspace} />
      <AboutWorkspace workspace={workspace} />
      <AmenitiesAndBookingRules workspace={workspace} />
    </main>
  )

}

export default async function WorkspaceDetailPage({ params }: WorkspacePageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<p className="mt-10 text-xl text-center font-bold text-app-primary">Loading details....</p>}>
      <Details slug={slug}/>
    </Suspense>
  );
}
