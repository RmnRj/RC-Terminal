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
<<<<<<< HEAD
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
=======
    <html lang="en" className={`${sourceCodePro.variable} dark`}>
      <head />
>>>>>>> 066b5769a8ee022d00f9b76a1087795e6d0c3142
      <body className="font-code antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
