import "./globals.css";
import localFont from "next/font/local";
import { Sarabun, Tajawal } from "next/font/google";
import { cn } from "@/lib/utils/tailwind-merge";
const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sarabun",
});

const tajawal = Tajawal({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

const edwardianScript = localFont({
  src: "./fonts/edwardianscriptitc.ttf",
  variable: "--font-edwardian",
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={cn(
          `${sarabun.variable} ${tajawal.variable} ${edwardianScript.variable} antialiased`,
        )}>
        {children}
      </body>
    </html>
  );
}
