import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noah Tajalli - Portfolio",
  description: "Personal portfolio website of Noah Tajalli, Software Development Engineer at AWS and UMD graduate",
  keywords: ["Noah Tajalli", "Portfolio", "Software Engineer", "AWS", "Cloud Computing", "Computer Science"],
  authors: [{ name: "Noah Tajalli" }],
  creator: "Noah Tajalli",
  openGraph: {
    title: "Noah Tajalli - Portfolio",
    description: "Personal portfolio website of Noah Tajalli, Software Development Engineer at AWS and UMD graduate",
    type: "website",
    locale: "en_US",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#00FFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Noah Tajalli",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#00FFFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Noah Tajalli" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
