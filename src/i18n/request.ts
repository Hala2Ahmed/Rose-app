import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
        formats: {
            number: {
                currency: {
                    style: 'currency',
                    currency: 'EGP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    numberingSystem: locale == "ar" ? "arab" : "latn",
                    currencyDisplay: locale === 'ar' ? 'symbol' : 'code',
                },

                percent: {
                    style: 'percent',
                    minimumFractionDigits: 0,
                    numberingSystem: locale == "ar" ? "arab" : "latn",
                },

            },
            dateTime: {
                "long-date": {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    numberingSystem: locale == "ar" ? "arab" : "latn",
                },
                "short-date": {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    numberingSystem: locale == "ar" ? "arab" : "latn",
                },
                year: {
                    year: 'numeric',
                    numberingSystem: locale == "ar" ? "arab" : "latn",
                }
            },
        }
    };
});