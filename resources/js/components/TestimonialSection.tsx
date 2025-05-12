import { motion } from "framer-motion";
import AnimateOnView from "./AnimateOnView";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Manufactured is the future of housing.",
    name: "Grayson Gibson",
    title: "CEO, Mobile Fund Services",
  },
  {
    quote: "Innovation in manufactured housing is transforming communities.",
    name: "Sarah Martinez",
    title: "Housing Development Director",
  },
  {
    quote: "The next generation of affordable housing starts here.",
    name: "Michael Chen",
    title: "Urban Planning Consultant",
  },
];

const TestimonialSection = () => {
  return (
    <div className="w-full relative">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="w-full h-[75vh] bg-gray-800 sticky rounded-t-2xl border-t-2 border-gray-600"
          style={{
            top: `calc(30vh + ${index * 10}px)`,
            zIndex: testimonials.length + index,
          }}
        >
          <AnimateOnView delay={0.1}>
            <motion.div
              initial={{ y: "80vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full h-[70vh] bg-gray-800 text-gray-200 flex flex-col items-center justify-center px-4 mx-auto max-w-7xl"
            >
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  "{testimonial.quote}"
                </p>
                <p className="text-xl md:text-2xl font-semibold mb-2 text-gray-100">
                  {testimonial.name}
                </p>
                <p className="text-lg md:text-xl text-gray-400">
                  {testimonial.title}
                </p>
              </div>
            </motion.div>
          </AnimateOnView>
        </div>
      ))}
    </div>
  );
};

export default TestimonialSection;
