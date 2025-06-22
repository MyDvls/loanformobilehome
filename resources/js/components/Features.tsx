import { Card } from '@/components/ui/card';
import { DollarSign, FileText, ShieldCheck, Star, Users } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    DollarSign,
    FileText,
    ShieldCheck,
    Star,
    Users,
};

const Features = ({ featuresSection }: { featuresSection: any }) => {
    const features = featuresSection
        ? [
              {
                  icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/49ae7f7241201d554d39a316734c19d97c016c1d?placeholderIfAbsent=true',
                  title: featuresSection?.feature1?.title || 'Feature 1 Title',
                  description: featuresSection?.feature1?.description || 'Feature 1 Description',
              },
              {
                  icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/caa9cebb7f2ee27128b046f808519ee1b0db109b?placeholderIfAbsent=true',
                  title: featuresSection?.feature2?.title || 'Feature 2 Title',
                  description: featuresSection?.feature2?.description || 'Feature 2 Description',
              },
              {
                  icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/c86d775aad3393f5c1db83c020640f53aeceb20f?placeholderIfAbsent=true',
                  title: featuresSection?.feature3?.title || 'Feature 3 Title',
                  description: featuresSection?.feature3?.description || 'Feature 3 Description',
              },
              {
                  icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/7e70a0f079b36271b9a4cc5c402397a0339a9114?placeholderIfAbsent=true',
                  title: featuresSection?.feature4?.title || 'Feature 4 Title',
                  description: featuresSection?.feature4?.description || 'Feature 4 Description',
              },
              {
                  icon: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/7e70a0f079b36271b9a4cc5c402397a0339a9114?placeholderIfAbsent=true',
                  title: featuresSection?.feature5?.title || 'Feature 5 Title',
                  description: featuresSection?.feature5?.description || 'Feature 5 Description',
              },
          ]
        : [];

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
                                key={index}
                                className="flex min-h-[249px] min-w-96 flex-1 shrink basis-[0%] flex-col rounded-2xl border border-[#F9F0E9] bg-[#FDFAF8] p-4 text-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] dark:border-[#4A4A4A] dark:bg-[#333333]"
                            >
                                <img src={feature.icon} className="aspect-[1] w-[76px] self-center object-contain" alt={`${feature.title} icon`} />
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
                                key={index}
                                className="flex w-full flex-col rounded-2xl border border-[#F9F0E9] bg-[#FDFAF8] p-4 text-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] dark:border-[#4A4A4A] dark:bg-[#333333]"
                            >
                                <img src={feature.icon} className="aspect-[1] w-[64px] self-center object-contain" alt={`${feature.title} icon`} />
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
