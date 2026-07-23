import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), 
  title: "Campers Trucks | Camper Rental Service",
  description:
    "Browse and rent modern campers for your next adventure. Choose from a wide selection of fully equipped camper vans and motorhomes.",

  openGraph: {
    title: "Campers Trucks | Camper Rental Service",
    description:
      "Explore our camper catalog and find the perfect vehicle for your next road trip.",
    url: "/", 
    siteName: "Campers Trucks",
    images: [
      {
        url: "/img/bg-img.jpg",
        width: 1200,
        height: 630,
        alt: "Campers Trucks camper catalog",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="bottom-center" />
        </TanStackProvider>
      </body>
    </html>
  );
}