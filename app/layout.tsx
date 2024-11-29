import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Color Game",
  description:
    "Test your color skills with this fun and interactive color game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Test your color skills with this fun and interactive color game. Can you spot the odd color in 36 blocks?"
        />
        <meta property="og:title" content="Color Game - Find the Odd Color!" />
        <meta
          property="og:description"
          content="A fun and interactive color game to challenge your observation skills. Find the odd color in a grid of 36 blocks!"
        />

        {/* Favicon */}
        <link rel="icon" href="/colors.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
