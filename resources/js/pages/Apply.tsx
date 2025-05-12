import { Card } from "@/components/ui/card";
import ApplicationForm from "@/components/ApplicationForm";
import { useTranslation } from "react-i18next";
import LandingLayout from "@/layouts/landing-layout";
import { Head } from "@inertiajs/react";

const Apply = () => {
  const { t } = useTranslation();

  return (
    <LandingLayout>
            <Head title="Home" />
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {t("apply.title")}
        </h1>
        <ApplicationForm />
      </Card>
    </div>
    </LandingLayout>
  );
};

export default Apply;
