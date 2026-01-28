import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.02 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.3
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
