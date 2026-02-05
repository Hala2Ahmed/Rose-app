import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const authPages = ["/login", "/register", "/forgot-password"];

export default async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;

    const segments = pathname.split('/');
    const locale = routing.locales.includes(segments[1] as any) ? segments[1] : routing.defaultLocale;
    
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    const token = await getToken({ req });

    if (pathnameWithoutLocale.startsWith('/dashboard')) {
        if (!token) {
            const loginUrl = new URL(`/${locale}/login`, req.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
        return intlMiddleware(req);
    }

    const isAuthPage = authPages.some(page => pathnameWithoutLocale === page);
    if (isAuthPage) {
        if (token) {
            return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
        }
        return intlMiddleware(req);
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)"],
};


