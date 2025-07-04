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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
