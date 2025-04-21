import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../../styles/globals.css";
import { GigProvider } from "@/app/contexts/GigContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethio Gigs Bot",
  description: "This is a mini gig posts page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <GigProvider>{children}</GigProvider>
      </body>
    </html>
  );
}
