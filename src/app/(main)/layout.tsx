import type { Metadata } from "next";
import { Suspense } from "react";
import SiteFooter from "@/components/home/SiteFooter";
import SiteNavbar, { SiteNavbarFallback } from "@/components/home/SiteNavbar";
import { ModalContextProvider } from "@/lib/context/modal-context";


export const metadata: Metadata = {
  metadataBase: new URL("https://workcorp.netlify.app"),
  title: {
    default: "Workcorp - workspaces that work for you",
    template: "%s | Workcorp",
  },
  description: "The ultimate workspace booking and management platform for remote workers and modern hybrid teams.",
  keywords: ["Workspace booking", "Hot desking app", "Coworking space platform", "Hybrid work management", "workspace floor pan"],
  authors: [{ name: "Hafeezah" }],
  openGraph: {
    title: "Workcorp - workspaces that work for you",
    description: "Your ultimate workspace booking platform. Stay focused, Stay productive.",
    url: "https://workcorp.netlify.app",
    siteName: "Workcorp",
    images: [
      {
        url: "/wc-og-image.jpg",
        width: 1200,
        height: 795,
        alt: "Preview of a Workcorp booking space",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ModalContextProvider>
        <Suspense fallback={<SiteNavbarFallback />}>
          <SiteNavbar />
        </Suspense>
        <div className="flex-1 pt-24">{children}</div>
        <SiteFooter />
      </ModalContextProvider>
    </>
  );
}
