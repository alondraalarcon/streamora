import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layouts/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional for Tailwind
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-zinc-950  min-h-screen text-white">
          <Navbar/>
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
