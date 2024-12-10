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
          className="flex gap-1 mt-1 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors duration-300"
          onClick={onDelete}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
          Eliminar
        </button>
      </div>
    </motion.div>
  );
}

