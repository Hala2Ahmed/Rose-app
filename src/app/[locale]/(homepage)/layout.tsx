import { Sarabun, Tajawal } from "next/font/google";
import { Providers } from "../../../components/providers/index";
import { hasLocale, Locale } from "next-intl";
import { routing } from "../../../i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

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
  children: React.ReactNode,
  params: { locale: Locale },
}

export async function generateMetadata({ params: { locale } }: Pick<LayoutProps, "params">): Promise<Metadata> {
  const t = await getTranslations("metadata.root");

  return {
    title: t("title"),
    description: t("description"),
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable Static Rendering
  setRequestLocale(locale);

  return (
    <html lang="en">
      <body className={`${sarabun.variable} ${tajawal.variable} antialiased`}>
        <main className="mx-20">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
