import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-5 px-5 md:px-[60px] py-10 md:py-20">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 xl:pl-15 xl:pt-25">
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <p className="text-[#191817] dark:text-gray-100 text-xl font-medium mb-2">
              "{t("home.title")}"
            </p>

            <h1 className="text-[#191817] dark:text-white text-4xl md:text-5xl font-bold leading-tight md:leading-[64px]">
              {t("home.subtitle1")} <span className="text-[#5B3D5C] dark:text-purple-300">{t("home.subtitle2")}</span> {t("home.subtitle3")}
            </h1>

            <p className="text-[#32302E] dark:text-gray-300 text-base font-semibold leading-6 mt-5">
              {t("home.cta")}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-7">
              <Button variant="secondary">
                {t("home.apply")}
              </Button>
              <Button variant="primary">
                {t("home.how")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/80a06b908c71e80236cf9d2161c9443071f619c9?placeholderIfAbsent=true"
            alt="Mobile home financing illustration"
            className="w-full h-auto object-contain rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
