
import Footer from "@/components/layout/app/Footer";
import Header from "@/components/layout/app/Header";
import { CartProvider } from "@/components/providers/cart.provider";

type LayoutProps = {
    children: React.ReactNode;
};

export default function SiteLayout({
    children,
}: LayoutProps) {

    return (
        <>
            {/** Header */}
            <CartProvider>

            <Header />

            {/** main component */}
            <div className="px-20 pt-10">
                {children}
            </div>

            {/** Footer */}
            <Footer />
            
            </CartProvider>

        </>
    );
}
