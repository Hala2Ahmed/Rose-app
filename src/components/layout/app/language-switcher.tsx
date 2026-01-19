"use client";

import React from 'react'
import { usePathname, useRouter } from '../../../i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from '../../ui/button';

const LanguageSwitcher = () => {
    // Translation
    const locale = useLocale();

    // Navigation
    const router = useRouter();
    const pathname = usePathname();

    // Functions
    function switchLanguage() {
        router.push({
            pathname,
            query: Object.fromEntries(new URLSearchParams(location.search).entries()),
        },
            {
                locale: locale == "ar" ? "en" : "ar",
            })
    }

    return (
        <Button
            onClick={switchLanguage}
            variant={"ghost"}
            className=' text-zinc-700 dark:text-zinc-50 rounded-none shadow-none'
        >
            {locale == "ar" ? "English" : "العربية"}
        </Button>
    )
}

export default LanguageSwitcher;
