import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsApp } from "@/components/WhatsApp";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  openGraph:{type:"website",siteName:"QMULATE",
    title:"QMULATE — Real Estate Wealth Platform",
    description:"Wealth, structured to outlast its makers."},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Navbar/>
          {children}
          <Footer/>
          <WhatsApp/>
        </ThemeProvider>
      </body>
    </html>
  );
}
