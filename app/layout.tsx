import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import TempleChatbot from "@/components/TempleChatbot";
import CursorFollower from "@/components/CursorFollower";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sri Manakula Vinayagar Devasthanam — Puducherry",
  description: "Book sacred services, make donations via E-Undiyal, and experience the divine heritage of Sri Manakula Vinayagar Temple, Puducherry. Moolavar Abishegam, Homam, Kaapu, Chariot and more.",
  keywords: ["Manakula Vinayagar", "Temple Booking", "Puducherry Temple", "Ganesha", "E-Undiyal", "Abishegam"],
  openGraph: {
    title: "Sri Manakula Vinayagar Devasthanam",
    description: "Sacred online services for the divine abode of Lord Ganesha in Puducherry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta-IN" className="dark">
      <body className={`${inter.variable} ${cormorant.variable} ${jbMono.variable} font-body bg-bg-deep text-ivory antialiased overflow-x-hidden`}>
        {children}
        <CursorFollower />
        <TempleChatbot />
      </body>
    </html>
  );
}
