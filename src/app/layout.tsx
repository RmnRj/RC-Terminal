import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "RC Terminal Portfolio",
  description: "A terminal-style personal portfolio for Raman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceCodePro.variable} dark`}>
      <head />
      <body className="font-code antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
