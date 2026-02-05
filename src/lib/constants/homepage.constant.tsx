// imports
import { IBenefitsSection, IOccasionsSection } from "../types";
import { Headset, RefreshCw, ShieldCheck, Truck } from 'lucide-react';

// Feature items displayed in the About section
export const ABOUT_FEATURES = [
    { id: 1, textKey: "features.feature_1" },
    { id: 2, textKey: "features.feature_2" },
    { id: 3, textKey: "features.feature_3" },
    { id: 4, textKey: "features.feature_4" },
];

// Feature items displayed in the Gallery section
export const GALLERY_FEATURES = [
    { id: "img-11", src: "/assets/images/image11.png", height: "38.563rem" },
    { id: "img-12", src: "/assets/images/image12.png", height: "25.3rem" },
    { id: "img-5", src: "/assets/images/image5.png", height: "25.688rem" },
    { id: "img-10a", src: "/assets/images/image10.png", height: "38.188rem" },
    { id: "img-10b", src: "/assets/images/image10.png", height: "25.688rem" },
    { id: "img-7", src: "/assets/images/image7.png", height: "38.188rem" },
];

// Feature items displayed in the Companies section
export const COMPANIES_FEATURES = [
    { id: 1, name: "Brand 1", logo: "/assets/brands/1.png" },
    { id: 2, name: "Brand 2", logo: "/assets/brands/2.png" },
    { id: 3, name: "Brand 3", logo: "/assets/brands/3.png" },
    { id: 4, name: "Brand 4", logo: "/assets/brands/4.png" },
    { id: 5, name: "Brand 5", logo: "/assets/brands/5.png" },
    { id: 6, name: "Brand 6", logo: "/assets/brands/6.png" },
];



export const benefitsData: IBenefitsSection[] = [
    {
        title: "benefit_title_1",
        description: "benefit_desc_1",
        icon: <Truck size={40} />,
    },
    {
        title: "benefit_title_2",
        description: "benefit_desc_2",
        icon: <RefreshCw size={40} />,
    },
    {
        title: "benefit_title_3",
        description: "benefit_desc_3",
        icon: <ShieldCheck size={40} />,
    },
    {
        title: "benefit_title_4",
        description: "benefit_desc_4",
        icon: <Headset size={40} />,
    }
];

export const occasionsData: IOccasionsSection[] = [
    {
        image: "/assets/images/image9.png",
        badge: "occasion_badge_1",
        title: "occasion_title_1",
    },
    {
        image: "/assets/images/image7.png",
        badge: "occasion_badge_2",
        title: "occasion_title_2",
    },
    {
        image: "/assets/images/image13.png",
        badge: "occasion_badge_3",
        title: "occasion_title_3",
    },
];

export const occasionsSliderData: IOccasionsSection[] = [
    {
        image: "/assets/images/image2.png",
        title: "occasions_slider_title",
        description: "occasions_slider_desc",
    },
    {
        image: "/assets/images/image10.png",
        title: "occasions_slider_title",
        description: "occasions_slider_desc",
    },
    {
        image: "/assets/images/image7.png",
        title: "occasions_slider_title",
        description: "occasions_slider_desc",
    },
    {
        image: "/assets/images/image13.png",
        title: "occasions_slider_title",
        description: "occasions_slider_desc",
    },
];

export const occasion = {
    image: "/assets/images/image4.png",
    badge: "occasion_badge",
    title: "occasion_title"
};
