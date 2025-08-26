import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "RC Terminal Portfolio",
  description: "A terminal-style personal portfolio for Raman.",
  icons: {
    icon: "/Terminal-icon.ico",
    shortcut: "/Terminal-icon.ico",
    apple: "/Terminal-icon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/Terminal-icon.ico",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Terminal-icon.ico" sizes="any" />
        <link rel="icon" href="/Terminal-icon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/Terminal-icon.ico" />
        <link rel="apple-touch-icon" href="/Terminal-icon.ico" />
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
      <body className="font-code antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
