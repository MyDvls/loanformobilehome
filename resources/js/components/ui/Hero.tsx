import { Button } from "@/components/ui/Button";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroItem {
    id: number;
    image_path: string;
}

interface HeroData {
    slogan?: string;
    heading_part1?: string;
    heading_part2?: string;
    heading_part3?: string;
    sub_heading?: string;
    image_path?: string;
}

interface HeroProps {
    hero: HeroData;
    heroItems?: HeroItem[];
}

export function Hero({ hero, heroItems }: HeroProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log('Hero component initialized with hero data:', hero);
    console.log('Hero items:', heroItems);
    // Get all available images (heroItems + fallback)
    const images = heroItems && heroItems.length > 0 
        ? heroItems.map(item => item.image_path)
        : [hero?.image_path || 'images/Mobile-home-autumn-comprimida.jpeg'];
    
    // Set up interval for image rotation
    useEffect(() => {
        if (images.length <= 1) return; // Don't rotate if only one image
        
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5 seconds
        
        return () => clearInterval(interval);
    }, [images.length]);
    
    console.log('Hero component rendered with hero data:', hero);
    console.log('Hero items:', heroItems);
    console.log('Current image index:', currentImageIndex);
    
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
                <div className="w-full md:w-1/2 relative">
                    <div className="relative overflow-hidden rounded-md">
                        <img
                            src={images[currentImageIndex]}
                            alt={`Mobile home financing illustration ${currentImageIndex + 1}`}
                            className="w-full h-auto object-contain rounded-md transition-opacity duration-500"
                        />
                        
                        {/* Image indicators */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentImageIndex 
                                                ? 'bg-[#5B3D5C] dark:bg-purple-300' 
                                                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                                        }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}