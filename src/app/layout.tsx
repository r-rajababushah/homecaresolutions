import type { Metadata } from "next";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import MobileContactBar from "@/components/public/MobileContactBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Appliance Repair in Kathmandu",
  description:
    "AC, refrigerator and washing machine repair services in Kathmandu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />

        <MobileContactBar />
      </body>
    </html>
  );
}