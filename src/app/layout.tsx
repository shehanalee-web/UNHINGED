import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "UNHINGED",
  description: "Ask the Council. Regret nothing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${vt323.variable} h-full`}>
      <body className="min-h-full bg-paper font-ui text-ink">{children}</body>
    </html>
  );
}
