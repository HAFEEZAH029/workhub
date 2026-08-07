import SiteFooter from "@/components/home/SiteFooter";
import SiteNavbar from "@/components/home/SiteNavbar";
import { ModalContextProvider } from "@/lib/context/modal-context";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ModalContextProvider>
        <SiteNavbar />
        <div className="flex-1 pt-24">{children}</div>
        <SiteFooter />
      </ModalContextProvider>
    </>
  );
}
