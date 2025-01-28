"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800  border-t dark:border-gray-700 duration-500">
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Generador de Currículum Vitae Profesional
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs">
              Creador de currículum vitae profesional y asistente IA para
              ayudarte a destacar en tu búsqueda laboral.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Características
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
              <li>• Distintos Formatos de Currículum Vitae profesional</li>
              <li>• Asistente IA para perfiles</li>
              <li>• Envio de currículum vitae en PDF</li>
              <li>• Diseño limpio y profesional</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Contacto
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-xs">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.00098 3H20.001C20.5533 3 21.001 3.44772 21.001 4V20C21.001 20.5523 20.5533 21 20.001 21H4.00098C3.44869 21 3.00098 20.5523 3.00098 20V4C3.00098 3.44772 3.44869 3 4.00098 3ZM5.00098 5V19H19.001V5H5.00098ZM7.50098 9C6.67255 9 6.00098 8.32843 6.00098 7.5C6.00098 6.67157 6.67255 6 7.50098 6C8.3294 6 9.00098 6.67157 9.00098 7.5C9.00098 8.32843 8.3294 9 7.50098 9ZM6.50098 10H8.50098V17.5H6.50098V10ZM12.001 10.4295C12.5854 9.86534 13.2665 9.5 14.001 9.5C16.072 9.5 17.501 11.1789 17.501 13.25V17.5H15.501V13.25C15.501 12.2835 14.7175 11.5 13.751 11.5C12.7845 11.5 12.001 12.2835 12.001 13.25V17.5H10.001V10H12.001V10.4295Z"></path>
                </svg>

                <a
                  href="https://www.linkedin.com/in/javier-espindola/"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nicolas Espindola
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Generador de Currículum Vitae. Todos
            los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
