import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

type ContactFormData = {
  name: string;
  email: string;
  message?: string;
};

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();
  const { t } = useTranslation();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      alert("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <section className="w-full max-w-full xl:min-w-[420px] xl:pl-[250px] px-4 md:px-10 justify-center items-stretch border border-[#F9F0E9] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] self-stretch flex min-h-[500px] xl:min-h-[599px] flex-col flex-1 shrink basis-[0%] bg-[#FDFAF8] dark:bg-[#333333] dark:border-[#4A4A4A] my-auto mx-auto py-6 md:py-9 rounded-2xl border-solid">
      <div className="flex w-full flex-col items-stretch justify-center md:justify-end">
        <header className="w-full text-center">
          <h1 className="text-[#191817] text-2xl md:text-[40px] dark:text-[#E5E7EB] font-bold">
            {t("contact.title")}
          </h1>
          <p className="text-[#111] dark:text-[#E5E7EB] text-sm md:text-base font-semibold leading-6 mt-1 px-2 md:px-0">
            {t("contact.subtitle")}
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[300px] md:min-h-[100px] w-full font-normal mt-6 md:mt-[10px]"
          noValidate
        >
          <fieldset className="bg-blend-normal w-full">
            <label
              htmlFor="name"
              className="text-[#958f8b] text-sm leading-[21px] block"
            >
              {t("contact.form_name")} <span className="text-[#d32f2f]">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="text-[#4A4745] dark:text-[#BBBBBB] text-ellipsis border border-[#F9F0E9] w-full text-sm md:text-base bg-[#F5EEE9] dark:bg-[#4A4A4A] mt-1 px-3 md:px-4 py-3 md:py-[13px] rounded-lg border-solid focus:outline-none focus:ring-2 focus:ring-[#49274A] focus:border-transparent"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-[#d32f2f] text-sm mt-1"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </fieldset>

          <fieldset className="bg-blend-normal w-full mt-4">
            <label
              htmlFor="email"
              className="text-[#958f8b] text-sm leading-[21px] block"
            >
              {t("contact.form_email")} <span className="text-[#d32f2f]">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="text-[#4A4745] dark:text-[#BBBBBB] text-ellipsis border border-[#F9F0E9] w-full text-sm md:text-base bg-[#F5EEE9] dark:bg-[#4A4A4A] mt-1 px-3 md:px-4 py-3 md:py-[13px] rounded-lg border-solid focus:outline-none focus:ring-2 focus:ring-[#49274A] focus:border-transparent"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-[#d32f2f] text-sm mt-1"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </fieldset>

          <fieldset className="bg-blend-normal h-[120px] md:h-[143px] w-full mt-4">
            <label htmlFor="message" className="text-[#958F8B] text-sm block">
              {t("contact.form_message")} <span className="text-[#d32f2f]">*</span>
            </label>
            <textarea
              id="message"
              placeholder="Text Here...."
              {...register("message")}
              className="text-[#4A4745] text-ellipsis border dark:text-[#BBBBBB] border-[#F9F0E9] w-full text-sm md:text-base bg-[#F5EEE9] dark:bg-[#4A4A4A] mt-1 pt-3 md:pt-[13px] px-3 md:px-4 rounded-lg border-solid resize-none focus:outline-none focus:ring-2 focus:ring-[#49274A] focus:border-transparent h-[90px] md:h-[110px]"
              rows={3}
            />
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className="justify-center items-center border-[#49274A] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] flex min-h-10 md:min-h-12 w-full gap-2 overflow-hidden text-sm md:text-base text-[#FDFAF8] font-semibold whitespace-nowrap text-center flex-wrap bg-[#49274A] mt-4 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-0 border-solid hover:bg-[#3a1f3b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#49274A] focus:ring-offset-2"
          >
            <span className="text-[#FDFAF8] self-stretch my-auto">
              {isSubmitting ? "Sending..." : "Send"}
            </span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/c28704ee7218753b3e7da199aa39de34301a43c3?placeholderIfAbsent=true"
              alt=""
              className="aspect-[1] object-contain w-4 md:w-5 self-stretch shrink-0 my-auto"
            />
          </button>
        </form>
      </div>
    </section>
  );
};