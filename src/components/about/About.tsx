"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 dark:text-white"
        >
          Sobre el creador de currículum vitae
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">
              Diseña tu Currículum Vitae Profesional
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Un formato clásico y elegante, perfecto para postulaciones en
              empresas tradicionales. Organiza tu información de manera clara y
              directa.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Diseño limpio y profesional</li>
              <li>• Elige entre diferentes estilos.</li>
              <li>• Organización clara por secciones</li>
              <li>• Densidad de contenido óptima</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
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
                fill
                src="/images/cvejemplohardvard.png"
                alt="Ejemplo de CV"
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
                Todo en Un Solo Lugar
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Registra tus datos personales, educación y experiencia modifica
                y actualiza tu información cuando lo necesites.
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
                Fácil de Usar
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interfaz intuitiva que te guía paso a paso en la creación de tu
                currículum. Sin complicaciones ni conocimientos técnicos
                necesarios.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3 dark:text-gray-200">
                Generación Inmediata
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Obtén tu currículum en PDF en una versión digital cuando lo
                necesites.
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
            Crea tu Currículum Hoy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tanto si estás buscando tu primer trabajo como si quieres dar el
            siguiente paso en tu carrera, tenemos el formato perfecto para ti.
            Nuestros diseños te ayudan a presentar tu experiencia de forma
            profesional y atractiva, aumentando tus posibilidades de conseguir
            esa entrevista que deseas.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
