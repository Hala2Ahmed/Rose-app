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
        title: "Free Delivery",
        description: "For orders above 120 EGP",
        icon: <Truck size={40} />,
    },
    {
        title: "Get Refund",
        description: "Refunds within 30 days",
        icon: <RefreshCw size={40} />,
    },
    {
        title: "Safe Payment",
        description: "100% Secure Payment",
        icon: <ShieldCheck size={40} />,
    },
    {
        title: "24/7 Support",
        description: "Contact us at any time",
        icon: <Headset size={40} />,
    }
];

export const occasionsData: IOccasionsSection[] = [
    {
        image: "/assets/images/image9.png",
        badge: "Wedding",
        title: "Celebrate Her Forever with a Gift She’ll Always Remember",
    },
    {
        image: "/assets/images/image7.png",
        badge: "Engagement",
        title: "Honor the Beginning of a Beautiful Journey Together",
    },
    {
        image: "/assets/images/image13.png",
        badge: "Anniversary",
        title: "Mark Every Year of Love with a Meaningful Surprise",
    },
];

export const occasionsSliderData: IOccasionsSection[] = [
    {
        image: "/assets/images/image2.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
    {
        image: "/assets/images/image10.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
    {
        image: "/assets/images/image7.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
    {
        image: "/assets/images/image13.png",
        title: "Say It with Flowers",
        description: "Elegant gifts for every special moment..",
    },
];

export const occasion = {
    image: "/assets/images/image4.png",
    badge: "Staring from 10.99 EGP",
    title: "Special Gifts For The People You Love"
};
