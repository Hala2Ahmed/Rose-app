'use client'

import Link from 'next/link';
import { occasion } from '@/lib/constants/homepage.constant';
import OccasionCard from '../occasions-section/occasion-card';
import OccasionsSlider from '../occasions-section/occasions-slider';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    const t = useTranslations("home");

    return (
        <section className="grid grid-cols-7 gap-x-6">
            {/* shop now card */}
            <div className="col-span-2">
                <OccasionCard occasion={occasion} height={440}>
                    <Link href="/products">
                        {/* shop now button */}
                        <Button variant="primary">
                            {t("shop")}
                            <ArrowRight  />
                        </Button>
                    </Link>
                </OccasionCard>
            </div>
            {/* slider */}
            <div className="col-span-5">
                <OccasionsSlider />
            </div>
        </section>
    )
}
