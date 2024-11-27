import { motion } from "framer-motion";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  details: string[];
  onDelete: () => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function InfoCard({ title, subtitle, details, onDelete }: InfoCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
      className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          {subtitle && <h4 className="text-gray-600 dark:text-gray-400">{subtitle}</h4>}
          {details.map((detail, index) => (
            <p key={index} className="text-sm mt-1 text-gray-700 dark:text-gray-300">
              {detail}
            </p>
          ))}
        </div>
        <button
          type="button"
          className="mt-1 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors duration-300"
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
}

