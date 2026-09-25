import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { MotionProvider } from "@/components/ui/Reveal";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frankford Avenue Dental Group | Dentist in Northeast Philadelphia",
  description:
    "Family, cosmetic and emergency dentistry at 7538 Frankford Ave, Philadelphia, PA 19136. Open Mon–Fri 9am–8pm. Call (215) 333-4744 or book online.",
};

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} antialiased`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
