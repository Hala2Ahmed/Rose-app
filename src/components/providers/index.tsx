import { NextIntlClientProvider } from "next-intl";
import NextAuthProvider from "./shared/components/next-auth.provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Providers */}
      {/* <NextAuthProvider> */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      {/* </NextAuthProvider> */}
    </>
  );
}
