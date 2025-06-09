import { useTranslation } from 'react-i18next';

const ServicesSection = () => {
    const { t } = useTranslation();

    const services = [
        {
            id: 1,
            image: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/e5eac81f96a88033f97adfc424e8143de6823829?placeholderIfAbsent=true',
            title: t('services.mortgage.title'),
            description: t('services.mortgage.description'),
        },
        {
            id: 2,
            image: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/94956d5c13f803f89cf197f91cd9237d2507e440?placeholderIfAbsent=true',
            title: t('services.closing.title'),
            description: t('services.closing.description'),
        },
        {
            id: 3,
            image: 'https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/1958ffae6de1889377673fb11777427a4d426440?placeholderIfAbsent=true',
            title: t('services.investment.title'),
            description: t('services.investment.description'),
        },
    ];

    return (
        <section className="px-6 py-20 sm:px-10 lg:px-20 dark:bg-black">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">{t('services.title')}</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('services.subtitle')}</p>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg dark:bg-[#333333]"
                        >
                            <img src={service.image} alt={service.title} className="mb-4 h-20 w-20 object-contain" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
