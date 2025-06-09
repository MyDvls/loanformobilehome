import React from 'react';

export const CompanyInfo: React.FC = () => {
  return (
    <aside className="flex max-w-full xl:max-w-[408px] items-center shadow-[0px_2px_4px_0px_rgba(0,0,0,0.20),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] self-stretch min-w-full md:min-w-60 min-h-[400px] xl:min-h-[525px] gap-2.5 flex-1 shrink basis-full lg:basis-[272px] bg-[#49274A] my-auto p-4 xl:p-6 rounded-2xl">
      <div className="self-stretch min-w-full md:min-w-60 w-full flex-1 shrink basis-[0%] my-auto">
        <header className="justify-center items-center flex w-full gap-1.5 text-base md:text-lg text-[#191817] font-bold bg-[#FDFAF8] dark:bg-[#111111] px-3 py-2 rounded-lg">
          <div className="flex justify-center w-full">
            <div className="flex items-center gap-1.5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/0f71a0f71ba86064cd7aa427ca96126bce115076?placeholderIfAbsent=true"
                alt="Mobile Fund Services Logo"
                className="aspect-[0.63] object-contain w-[20px] md:w-[27px]"
              />
              <div className="text-[#191817] dark:text-[#E5E7EB]">
                <span className="text-[#5b3d5c] block text-sm md:text-base">Mobile Fund</span>
                <span className="leading-[21px] block text-sm md:text-base">Services</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex w-full flex-col text-[#FDFAF8] mt-6 md:mt-8 space-y-6 md:space-y-10">
          <section className="self-stretch w-full">
            <div className="flex w-full max-w-full items-center gap-3 text-lg md:text-xl font-medium">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/c295b595adc2c3633dac38934feb1c86d7e5a042?placeholderIfAbsent=true"
                alt="Location icon"
                className="aspect-[0.72] object-contain w-[16px] md:w-[18px] flex-shrink-0"
              />
              <h2 className="text-[#FDFAF8] flex-1">
                Location
              </h2>
            </div>
            <div className="flex w-full flex-col text-sm md:text-base font-semibold leading-6 mt-3 md:mt-4">
              <address className="text-[#FDFAF8] not-italic">
                <span className="font-normal">Address:</span>
                <span className="block md:inline"> 324 Main St. Unit D. Lyons, CO 80540</span>
              </address>
            </div>
          </section>

          <section className="flex w-full max-w-full flex-col items-stretch">
            <div className="flex items-center gap-3 text-lg md:text-xl font-medium">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/529de8d9898343b0d371b4bbb5e8c8a005183354?placeholderIfAbsent=true"
                alt="Contact icon"
                className="aspect-[1] object-contain w-6 md:w-7 flex-shrink-0"
              />
              <h2 className="text-[#FDFAF8] flex-1">
                Contact
              </h2>
            </div>
            <div className="w-full text-sm md:text-base font-semibold leading-6 mt-3 md:mt-4 space-y-2">
              <div className="text-[#FDFAF8]">
                <span className="font-normal">Email:</span>
                {' '}
                <a 
                  href="mailto:Arhemy@loanformobilehome.com"
                  className="text-[#FDFAF8] hover:underline break-all"
                >
                  Arhemy@loanformobilehome.com
                </a>
              </div>
              <div className="text-[#FDFAF8]">
                <span className="font-normal">Telephone:</span>
                {' '}
                <a 
                  href="tel:+17205601018"
                  className="text-[#FDFAF8] hover:underline"
                >
                  (720) 560-1018
                </a>
              </div>
            </div>
          </section>

          <section className="flex w-full max-w-full flex-col items-stretch">
            <div className="flex items-center gap-3 text-lg md:text-xl font-medium">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8065c8e268d14015b7bf1ebd244b31e3/6abbc24f118f6d749994944fad8ab5c81fb6226d?placeholderIfAbsent=true"
                alt="Working hours icon"
                className="aspect-[1] object-contain w-6 md:w-7 flex-shrink-0"
              />
              <h2 className="text-[#FDFAF8] flex-1">
                Working hours
              </h2>
            </div>
            <div className="flex w-full flex-col items-stretch text-sm md:text-base font-semibold leading-6 mt-3 md:mt-4 space-y-1 md:space-y-2">
              <div className="text-[#FDFAF8]">
                <span className="font-normal">Monday to Friday:</span>
                <span className="block md:inline"> 9:00 am – 5:00 pm</span>
              </div>
              <div className="text-[#FDFAF8]">
                <span className="font-normal">Saturday & Sunday:</span>
                <span className="block md:inline"> Closed</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
};