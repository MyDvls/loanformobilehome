import { motion } from 'framer-motion';
import AnimateOnView from './AnimateOnView';

interface Testimonial {
    quote: string;
    name: string;
    title: string;
}

const testimonials: Testimonial[] = [
    {
        quote: 'Manufactured is the future of housing.',
        name: 'Grayson Gibson',
        title: 'CEO, Mobile Fund Services',
    },
    {
        quote: 'Innovation in manufactured housing is transforming communities.',
        name: 'Sarah Martinez',
        title: 'Housing Development Director',
    },
    {
        quote: 'The next generation of affordable housing starts here.',
        name: 'Michael Chen',
        title: 'Urban Planning Consultant',
    },
];

const TestimonialSection = () => {
    return (
        <div className="relative w-full">
            {testimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className="sticky h-[75vh] w-full rounded-t-2xl border-t-2 border-gray-600 bg-gray-800"
                    style={{
                        top: `calc(20vh + ${index * 10}px)`,
                        zIndex: testimonials.length + index,
                        background: 'linear-gradient(120deg, #958F8B 0%, #4A4745 43%, #191817 100%)',
                    }}
                >
                    <AnimateOnView delay={0.1}>
                        <motion.div
                            initial={{ y: '80vh', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mx-auto flex h-[70vh] w-full max-w-7xl flex-col items-center justify-center px-4"
                        >
                            <div className="mx-auto max-w-4xl text-center">
                                <p className="mb-8 text-3xl leading-tight font-bold text-gray-100 md:text-5xl">"{testimonial.quote}"</p>
                                <p className="mb-2 text-xl font-semibold text-gray-100 md:text-2xl">{testimonial.name}</p>
                                <p className="text-lg text-gray-400 md:text-xl">{testimonial.title}</p>
                            </div>
                        </motion.div>
                    </AnimateOnView>
                </div>
            ))}
        </div>
    );
};

export default TestimonialSection;
