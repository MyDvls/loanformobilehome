import { motion } from 'framer-motion';
import { useEffect, ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

export default function PageTransition({ children }: { children: ReactNode }) {
    const { props } = usePage();

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.url]);

    // Animation variants
    const pageVariants = {
        initial: {
            scale: 1,
            x: '50%',
            y: 0,
            opacity: 0,
        },
        animate: {
            scale: 1,
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
        exit: {
            scale: 0.95,
            x: '-50%',
            y: 0,
            opacity: 0.2,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="w-full h-full fixed-position-wrapper"
            style={{ position: 'relative' }}
        >
            {children}
        </motion.div>
    );
}