import { Sarabun, Tajawal } from "next/font/google";
import { hasLocale, Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cn } from "@/lib/utils/tailwind-merge";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Providers } from "@/components/providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

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

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export async function generateMetadata({
  params: { locale },
}: LayoutProps): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "metadata.root",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning>
      <body className={cn(sarabun.variable, tajawal.variable, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <ReactQueryProvider>
            <Providers>
              <Header />

              <main className="px-20 pt-10">{children}</main>

              <Footer />
              <Toaster richColors />
            </Providers>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
