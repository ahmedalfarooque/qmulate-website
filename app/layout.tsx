import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsApp } from "@/components/WhatsApp";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollProgress, PageTransition } from "@/components/Motion";
import { EnergyBeam } from "@/components/EnergyBeam";
import { ShaderWrapper } from "@/components/ui/shader-wrapper";

const geist = localFont({
  src:"../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable:"--font-geist",display:"swap",
});
const geistMono = localFont({
  src:"../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable:"--font-geist-mono",display:"swap",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/Logo.png" as="image"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ShaderWrapper />
          {/* Global scroll progress bar */}
          <ScrollProgress />
          <EnergyBeam />
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
