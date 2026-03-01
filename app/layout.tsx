import type { Metadata } from "next";
import { Cinzel, Sora } from "next/font/google";
import "@/styles/globals.css";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display"
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "AlterEgo",
  description: "Meet the version of you that made different choices."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} bg-abyss text-slate-100 noise-layer`}>
        {children}
      </body>
    </html>
  );
}