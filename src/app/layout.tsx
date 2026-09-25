import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unhinged-eta.vercel.app"),
  title: "UNHINGED",
  description: "Ask the Council. Regret nothing.",
  openGraph: {
    title: "UNHINGED",
    description: "Ask the Council. Regret nothing.",
    images: ["/uh.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${vt323.variable} h-full`}>
      <body className="min-h-full bg-paper font-ui text-ink">
        {children}
      </body>
    </html>
  );
}