import type { Metadata } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";
import { DemoBanner, Footer, Header } from "@/components/Shell";

export const metadata: Metadata = {
  title: { default: "Carport Wheels — Fitted Right", template: "%s — Carport Wheels" },
  description: "A fitment-first storefront concept for Carport Wheels on West Avenue.",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><DemoBanner /><Header /><main>{children}</main><Footer /></body></html>;
}
