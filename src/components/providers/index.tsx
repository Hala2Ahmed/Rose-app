import { NextIntlClientProvider } from "next-intl";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Providers */}
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </>
  );
}
