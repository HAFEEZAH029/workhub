import SiteNavbar from "@/components/home/SiteNavbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteNavbar />
      <div className="flex-1 pt-24">{children}</div>
    </>
  );
}
