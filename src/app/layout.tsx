import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { GigProvider } from "@/app/contexts/GigContext";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthProvider from "./providers/AuthProvider";
import Navbar from "./components/Navbar";

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
  description: "Find top talent or freelance opportunities",
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
        <AuthProvider>
          <ThemeProvider>
            <ReactQueryProvider>
              <Toaster position="top-right" />
              <GigProvider>
                {/* <Navbar />
                {children} */}
                <Navbar />
                <main className="min-h-screen bg-gray-50">{children}</main>
              </GigProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
