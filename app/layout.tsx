import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jisus - Private AI Assistant | Invisible to Screen Sharing",
  description:
    "Jisus is a private AI assistant that's completely invisible to screen sharing. Use AI while presenting on Zoom, Google Meet, or MS Teams without anyone seeing. Download for macOS and Windows.",
  keywords: [
    "AI assistant",
    "screen sharing",
    "private AI",
    "invisible overlay",
    "macOS app",
    "Windows app",
    "Zoom",
    "Google Meet",
    "MS Teams",
  ],
  authors: [{ name: "Jisus Team" }],
  icons: {
    icon: [
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "128x128", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Jisus - Private AI Assistant",
    description:
      "AI that's invisible to screen sharing. Use it during presentations without anyone knowing.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Jisus Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
