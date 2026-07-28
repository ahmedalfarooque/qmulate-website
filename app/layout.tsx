import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsApp } from "@/components/WhatsApp";
import { ScrollProgress, PageTransition } from "@/components/Motion";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = localFont({
  src:"../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable:"--font-geist",display:"swap",
});
const geistMono = localFont({
  src:"../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable:"--font-geist-mono",display:"swap",
});
const madaniArabic = localFont({
  src:[
    { path:"./fonts/madani/Madani-Arabic-Light.ttf", weight:"300", style:"normal" },
    { path:"./fonts/madani/Madani-Arabic-Regular.ttf", weight:"400", style:"normal" },
    { path:"./fonts/madani/Madani-Arabic-Medium.ttf", weight:"500", style:"normal" },
    { path:"./fonts/madani/Madani-Arabic-SemiBold.ttf", weight:"600", style:"normal" },
    { path:"./fonts/madani/Madani-Arabic-Bold.ttf", weight:"700", style:"normal" },
    { path:"./fonts/madani/Madani-Arabic-ExtraBold.ttf", weight:"800", style:"normal" },
  ],
  variable:"--font-madani",display:"swap",
});

export const metadata: Metadata = {
  title:{default:"QMULATE — Real Estate Wealth Platform",template:"%s | QMULATE"},
  description:"QMULATE organises real estate wealth through one integrated governance platform.",
  keywords:["real estate","wealth management","family office","governance","Saudi Arabia"],
  openGraph:{
    title:"QMULATE — Real Estate Wealth Platform",
    description:"QMULATE organises real estate wealth through one integrated governance platform.",
    siteName:"QMULATE",
    locale:"en_US",
    type:"website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/Logo.svg" as="image"/>
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${madaniArabic.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          {/* Global scroll progress bar */}
          <ScrollProgress />
          <Navbar/>
          {/* Page-level entrance transition */}
          <PageTransition>
            {children}
          </PageTransition>
          <Footer/>
          <WhatsApp/>
        </ThemeProvider>
      </body>
    </html>
  );
}
