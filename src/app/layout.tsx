import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Meet the Tribe — Live with the people who belong to the land",
  description:
    "Immersive, community-led journeys to indigenous territories in Amazonia, Kenya, and beyond.",
  openGraph: {
    title: "Meet the Tribe",
    description: "Live with the people who belong to the land.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <Nav />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
