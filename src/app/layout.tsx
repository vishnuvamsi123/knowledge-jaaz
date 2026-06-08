import type { Metadata, Viewport } from "next";
import "./globals.css";
import ScrollReset from "@/components/ScrollReset";

export const metadata: Metadata = {
  title: "Knowledge Jaaz — Learn Stock Market the Smart Way",
  description:
    "Knowledge Jaaz helps middle-class people learn investing, stock fundamentals, penny stocks, wealth creation, and real-time market insights in simple language. Stock Market Knowledge for Every Middle-Class Family.",
  keywords:
    "stock market education, learn investing, NSE BSE basics, penny stocks, fundamental analysis, SIP mutual funds, wealth creation India",
  openGraph: {
    title: "Knowledge Jaaz — Stock Market Knowledge for Every Middle-Class Family",
    description:
      "Learn investing, trading, and wealth creation in simple language. India's most trusted stock market education platform.",
    type: "website",
    siteName: "Knowledge Jaaz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Jaaz",
    description: "Learn Stock Market the Smart Way",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Disables browser scroll restoration so page always starts at top */}
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
