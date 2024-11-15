"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 dark:text-white"
        >
          Sobre el creador de CV
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">
              Constructor de CV Estilo Harvard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nuestro Constructor de CV implementa el prestigioso formato de
              currículum de Harvard, reconocido mundialmente por su claridad,
              profesionalismo y eficacia para destacar tus logros y
              cualificaciones profesionales.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Diseño limpio y profesional</li>
              <li>• Énfasis en logros cuantificables</li>
              <li>• Organización clara por secciones</li>
              <li>• Densidad de contenido óptima</li>
              <li>• Compatible con sistemas ATS</li>
            </ul>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative h-[300px] rounded-lg overflow-hidden group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/cvejemplohardvard.png"
                alt="Ejemplo de CV"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, x:50 }}
            animate={{ opacity: 1, x:0 }}
            transition={{ delay: 0.5 }}
            className="relative h-[350px] rounded-lg overflow-hidden"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.3,
                type: "tween",
                ease: "easeInOut",
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <Image
                src="/cvejemplohardvard.png"
                alt="Ejemplo de CV"
                fill
                className="object-cover object-top rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg duration-500"
        >
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">
            Características Principales
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-3 dark:text-gray-200">
                Vista Previa en Tiempo Real
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Observa cómo tu CV toma forma mientras ingresas tu información,
                con retroalimentación visual instantánea de cómo se verá tu
                documento final.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3 dark:text-gray-200">
                Asistente IA con Gemini
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Genera descripciones profesionales para tu perfil, experiencia
                laboral y habilidades utilizando la avanzada IA de Google
                Gemini.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3 dark:text-gray-200">
                Formato Harvard Optimizado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Estructura tu CV siguiendo las mejores prácticas recomendadas
                por Harvard, maximizando tus posibilidades de éxito en procesos
                de selección.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3 dark:text-gray-200">
                Personalización Inteligente
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Adapta cada sección a tus necesidades específicas mientras
                mantienes la consistencia y profesionalismo del formato Harvard.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            ¿Por qué elegir el formato Harvard?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            El formato de CV Harvard es reconocido por los reclutadores por su
            efectividad en presentar la información de manera clara y concisa.
            Este formato prioriza la legibilidad y la organización jerárquica de
            la información, permitiendo que tus logros y experiencias destaquen
            de manera natural. Además, su estructura está optimizada para
            sistemas de seguimiento de candidatos (ATS), aumentando tus
            posibilidades de superar los filtros iniciales de reclutamiento.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
