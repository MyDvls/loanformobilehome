import { useTranslation } from 'react-i18next';

interface ServiceItem {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
}

interface ServiceSection {
    heading: string;
    sub_heading: string;
}

interface Props {
    serviceSection: ServiceSection | null;
    serviceItems: ServiceItem[];
}

const ServicesSection = ({ serviceSection, serviceItems }: Props) => {
    const { t } = useTranslation();

    return (
        <section className="px-6 py-20 sm:px-10 lg:px-20 dark:bg-black">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">{serviceSection?.heading || t('services.title')}</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{serviceSection?.sub_heading || t('services.subtitle')}</p>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {serviceItems.length > 0 ? (
                        serviceItems.map((service) => (
                            <div
                                key={service.id}
                                className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg dark:bg-[#333333]"
                            >
                                {service.image_url ? (
                                    <img src={service.image_url} alt={service.title} className="mb-4 h-20 w-20 object-contain" />
                                ) : (
                                    <div className="mb-4 h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600" />
                                )}
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">{service.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-gray-600 dark:text-gray-300">{t('services.no_services')}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
