import { Card } from '@/components/ui/card';

interface FeatureItem {
    id?: number;
    title: string;
    description: string;
    image_path: string | null;
}

interface Props {
    featuresSection: { title: string } | null;
    featureItems: FeatureItem[];
}

const Features = ({ featuresSection, featureItems }: Props) => {
    console.log('Features Section:', featuresSection, 'Feature Items:', featureItems);
    // Map featureItems to features array
    const features = featureItems.map((item) => ({
        image_path: item.image_path || '/images/placeholder-home.jpg',
        title: item.title,
        description: item.description,
    }));

    if (!featuresSection || features.length === 0) {
        return null;
    }

    return (
        <>
            {/* Desktop Version (md and up) */}
            <section className="mt-[88px] hidden w-full px-[120px] md:block">
                <div className="w-full">
                    <h2 className="text-center text-[40px] font-bold text-black dark:text-white">{featuresSection.title}</h2>
                    <div className="mt-14 flex w-full flex-wrap gap-[18px_24px]">
                        {features.map((feature, index) => (
                            <Card
                                key={feature.id || index}
                                className="flex min-h-[249px] min-w-96 flex-1 shrink basis-[0%] flex-col rounded-2xl border border-[#F9F0E9] bg-[#FDFAF8] p-4 text-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] dark:border-[#4A4A4A] dark:bg-[#333333]"
                            >
                                <img
                                    src={feature.image_path}
                                    className="aspect-[1] w-[76px] self-center object-contain"
                                    alt={`${feature.title} image`}
                                    loading="lazy"
                                />
                                <div className="mt-4 w-full flex-1">
                                    <h3 className="text-xl font-medium text-[#111] dark:text-gray-200">{feature.title}</h3>
                                    <p className="mt-3 text-base leading-6 font-normal text-[#191817] dark:text-gray-200">{feature.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile Version (below md) */}
            <section className="mt-10 block w-full px-5 md:hidden">
                <div className="w-full">
                    <h2 className="text-center text-[28px] font-bold text-[#111] dark:text-white">{featuresSection.title}</h2>
                    <div className="mt-10 flex flex-col gap-6">
                        {features.map((feature, index) => (
                            <Card
                                key={feature.id || index}
                                className="flex w-full flex-col rounded-2xl border border-[#F9F0E9] bg-[#FDFAF8] p-4 text-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] dark:border-[#4A4A4A] dark:bg-[#333333]"
                            >
                                <img
                                    src={feature.image_path}
                                    className="aspect-[1] w-[64px] self-center object-contain"
                                    alt={`${feature.title} image`}
                                    loading="lazy"
                                />
                                <div className="mt-4 w-full">
                                    <h3 className="text-lg font-medium text-[#111] dark:text-gray-200">{feature.title}</h3>
                                    <p className="mt-3 text-base leading-6 font-normal text-[#191817] dark:text-gray-200">{feature.description}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
