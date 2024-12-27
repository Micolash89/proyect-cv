// components/Footer.tsx
"use client";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800  border-t dark:border-gray-700 duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sección del CV Builder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              CV Builder
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Creador de currículum vitae profesional con formato Harvard y asistente IA 
              para ayudarte a destacar en tu búsqueda laboral.
            </p>
          </motion.div>

          {/* Sección de Características */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Características
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>• Formato Harvard profesional</li>
              <li>• Asistente IA para perfiles</li>
              <li>• Vista previa en tiempo real</li>
              <li>• Exportación a PDF</li>
              <li>• Diseño responsive</li>
            </ul>
          </motion.div>

          {/* Sección de Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contacto
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                contacto@cvbuilder.com
              </li>
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                  />
                </svg>
                +54 (11) 1234-5678
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} CV Builder. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;