import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="flex w-full items-center gap-7 overflow-hidden flex-wrap mt-16 max-md:max-w-full max-md:mt-10">
        <div className="self-stretch flex min-w-[420px] min-h-[622px] flex-col justify-center flex-1 shrink basis-[0%] my-auto pl-[120px] py-[156px] max-md:max-w-full max-md:py-[100px] max-md:pl-5">
          <div className="w-full max-w-[588px] max-md:max-w-full">
            <div className="w-full max-md:max-w-full">
              <div className="text-[#191817] dark:text-gray-100 text-xl font-medium max-md:max-w-full">
                "Your Home. Your Future. Your Way."
              </div>
              <h1 className="text-[#191817] dark:text-white text-5xl font-bold leading-[64px] mt-2 max-md:max-w-full max-md:text-[40px] max-md:leading-[60px]">
                Your Path to{" "}
                <span className="text-[#5B3D5C] dark:text-purple-300">Mobile Home </span>
                Ownership Starts Here{" "}
              </h1>
            </div>
            <p className="text-[#32302E] dark:text-gray-300 text-base font-semibold leading-6 mt-5 max-md:max-w-full">
              Simple, transparent financing solutions for your manufactured
              home, with competitive rates and personalized service.{" "}
            </p>
          </div>

          <div className="flex min-h-12 w-full max-w-[588px] items-center gap-3 text-base font-semibold text-center flex-wrap mt-7 max-md:max-w-full">
            <Button variant="secondary">
              Apply for Loan
            </Button>
            <Button variant="primary">
              How it works
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/80a06b908c71e80236cf9d2161c9443071f619c9?placeholderIfAbsent=true"
          alt="Mobile home financing illustration"
          className="aspect-[1.19] object-contain w-full self-stretch min-w-80 flex-1 shrink basis-[120px] my-auto rounded-[8px_0px_0px_8px] max-md:max-w-full"
        />
      </div>
    </section>
  );
}
