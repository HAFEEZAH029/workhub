import {Mail, Phone, MapPin, ExternalLink, } from "lucide-react";

const ContactMenu = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:w-[320px] md:flex-1">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-app-neutral/10">
              <span className="grid size-10 place-items-center rounded-full bg-app-primary/15">
                <Mail className="size-5 text-app-primary" />
              </span>
              <p className="mt-3 font-bold text-app-neutral">Email Us</p>
              <p className="text-sm text-app-neutral/65">hello@workcorp.io</p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-app-neutral/10">
              <span className="grid size-10 place-items-center rounded-full bg-app-secondary/20">
                <Phone className="size-5 text-app-secondary" />
              </span>
              <p className="mt-3 font-bold text-app-neutral">Call Us</p>
              <p className="text-sm text-app-neutral/65">+1 (555) 000-0000</p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-app-neutral/10 sm:col-span-2">
              <div
                className="relative h-36 w-full bg-app-neutral bg-cover bg-center"
                style={{ backgroundImage: "url('/Images/app/map-preview.jpg')" }}
              >
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-app-neutral shadow-sm">
                  <MapPin className="size-3.5 text-app-secondary" />
                  Global HQ
                </span>
              </div>
              <div className="p-5">
                <p className="font-bold text-app-neutral">Find Us</p>
                <p className="mt-1 text-sm leading-6 text-app-neutral/65">
                  101 Mission St, Suite 500
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-app-primary hover:underline"
                >
                  View on Google Maps
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
  )
}

export default ContactMenu
