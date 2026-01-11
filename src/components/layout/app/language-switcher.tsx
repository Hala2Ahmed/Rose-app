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
        variant={"link"}
        className=' border-l hover:border-l'
        >
            {locale == "ar"? "English" : "العربية"}
        </Button>
    )
}

export default LanguageSwitcher;
