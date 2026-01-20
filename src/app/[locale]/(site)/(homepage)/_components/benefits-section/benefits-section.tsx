import { benefitsData } from "@/lib/constants/homepage.constant";

function BenefitsSection() {
    
    return (
        <section className="bg-maroon-50 rounded-2xl flex justify-around p-9">
            {/* Benefits Section */}
            {benefitsData.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <div className="bg-maroon-600 rounded-full size-16 flex items-center justify-center text-white">
                        {benefit.icon}
                    </div>
                    <div>
                        <h3 className="text-maroon-600 font-semibold text-xl">{benefit.title}</h3>
                        <p className="text-zinc-500 text-sm">{benefit.description}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default BenefitsSection;