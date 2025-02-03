import { InfoCardProps } from "@/lib/definitions";
import clsx from "clsx";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export function InfoCard({ title,idKey, subtitle, details, onDelete }: InfoCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
      className={clsx(
        "mb-4 p-4 border  rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300",
        {
          "border-gray-200 dark:border-gray-700": title.length ,
        }
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg hidden sm:block" title={title}>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</h3>
          <h3 className="font-bold text-lg block sm:hidden" title={title}>{title.length > 15 ? `${title.slice(0, 15)}...` : title}</h3>
          {subtitle && <h4 className="text-gray-600 dark:text-gray-400">{subtitle}</h4>}
          {details.map((detail, index) => (
            <p key={`${index}-${idKey}`} className="text-sm mt-1 text-gray-700 dark:text-gray-300">
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
          <span className="capitalize sm:block hidden" >
          eliminar
          </span>
        </button>
      </div>
    </motion.div>
  );
}

