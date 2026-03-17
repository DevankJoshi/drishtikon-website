import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const anton = Anton({
  variable: "--font-fallback-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drishtikon | Early Access",
  description: "A premium music launch experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${anton.variable} font-sans antialiased bg-black text-white relative`}
      >
        <div className="bg-grain"></div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
