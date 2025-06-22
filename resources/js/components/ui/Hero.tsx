import { Button } from "@/components/ui/Button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export function Hero({ hero }: { hero: any }) {
    return (
        <section className="w-full ">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-5 px-5 md:px-[60px] py-10 md:py-20">
                <div className="w-full md:w-1/2 xl:pl-15 xl:pt-25">
                    <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
                        <p className="text-[#191817] dark:text-gray-100 text-xl font-medium mb-2">
                            "{hero?.slogan || 'Your Home. Your Future. Your Way.'}"
                        </p>
                        <h1 className="text-[#191817] dark:text-white text-4xl md:text-5xl font-bold leading-tight md:leading-[64px]">
                            {hero?.heading_part1 || 'Your Path to '}<span className="text-[#5B3D5C] dark:text-purple-300">{hero?.heading_part2 || 'Mobile Home'}</span> {hero?.heading_part3 || ' Ownership Starts Here .'}
                        </h1>
                        <p className="text-[#32302E] dark:text-gray-300 text-base font-semibold leading-6 mt-5">
                            {hero?.sub_heading || 'Simple, transparent financing solutions for your manufactured home, with competitive rates and personalized service.'}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-7">
                            <Link href="/apply">
                                <Button variant="secondary">
                                    Apply Now <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/understanding-loan">
                                <Button variant="primary">
                                    How It Works <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <img
                        src={hero?.image_url || 'images/Mobile-home-autumn-comprimida.jpeg'}
                        alt="Mobile home financing illustration"
                        className="w-full h-auto object-contain rounded-md"
                    />
                </div>
            </div>
        </section>
    );
}