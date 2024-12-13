"use client";

import { useState } from "react";
import WrapperSectionInput from "./user/[id]/WrapperSectionInput";
import WrapperSection from "./user/[id]/WrapperSection";
import { motion } from "framer-motion";
import WrapperH2Section from "./user/[id]/WrapperH2Section";

interface Template {
  id: string;
  image: string;
  colors: string[];
}

const templates: Template[] = [
  {
    id: "template1",
    image: "/placeholder.svg?height=200&width=150",
    colors: ["#3B82F6"],
  },
  {
    id: "template2",
    image: "/placeholder.svg?height=200&width=150",
    colors: ["#10B981", "#3B82F6", "#EC4899"],
  },
  {
    id: "template3",
    image: "/placeholder.svg?height=200&width=150",
    colors: ["#F59E0B", "#6366F1"],
  },
];

export default function CVTemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    templates[0].id
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    templates[0].colors[0]
  );

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedColor(template.colors[0]);
    }
  };

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={sectionVariants}
      className="w-full max-w-4xl mx-auto p-4"
    >
      <WrapperSection>
        <WrapperSectionInput>
          <div className="overflow-hidden">
            <WrapperH2Section title="Seleccionar plantilla de CV" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {templates.map((template) => (
                <div key={template.id} className="relative">
                  <input
                    type="radio"
                    id={template.id}
                    name="cvTemplate"
                    value={template.id}
                    checked={selectedTemplate === template.id}
                    onChange={() => handleTemplateChange(template.id)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={template.id}
                    className={`block cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      selectedTemplate === template.id
                        ? "border-blue-500 ring-2 ring-blue-500"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={template.image}
                      alt={`Template ${template.id}`}
                      className="w-full h-auto object-cover"
                    />
                  </label>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-2 capitalize text-black dark:text-white">
              Seleccionar color
            </h3>
            <div className="flex flex-wrap gap-2">
              {templates
                .find((t) => t.id === selectedTemplate)
                ?.colors.map((color) => (
                  <div key={color} className="relative">
                    <input
                      type="radio"
                      id={color}
                      name="cvColor"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={color}
                      className={`block w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-blue-500"
                          : "hover:ring-2 hover:ring-offset-2 hover:ring-blue-300"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      <span className="sr-only">Color {color}</span>
                    </label>
                  </div>
                ))}
            </div>

            {/* <div className="flex justify-between p-6 bg-gray-50 dark:bg-gray-800/50">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => console.log('Template:', selectedTemplate, 'Color:', selectedColor)}
          >
            Guardar selección
          </button>

              <WrapperButton
                title="Siguiente"
                moveToNextSection={() => {}}
                color={"blue"}               
              />

        </div> */}
          </div>
        </WrapperSectionInput>
      </WrapperSection>
    </motion.section>
  );
}
