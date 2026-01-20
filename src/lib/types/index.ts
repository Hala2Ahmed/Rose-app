export interface IBenefitsSection {
    title: string;
    description: string;
    icon: React.ReactNode;
};

export interface IOccasionsSection {
    image: string;
    badge?: string;
    description?: string;
    title: string;
};

export interface IOccasionCardProps {
    occasion: IOccasionsSection,
    height: number,
    children?: React.ReactNode
}