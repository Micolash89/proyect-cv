"use client";

import { useState, useEffect } from "react";
import WrapperSectionInput from "./user/[id]/WrapperSectionInput";
import WrapperSection from "./user/[id]/WrapperSection";
import { motion } from "framer-motion";
import WrapperH2Section from "./user/[id]/WrapperH2Section";
import { templates } from "@/lib/constTemplate";
import Image from "next/image";

interface CVData {
  template: number;
  color: string;
}

export default function CVTemplateSelector({
  cvData,
  updateCVData,
}: {
  cvData: CVData;
  updateCVData: (data: CVData) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Set the initial index based on the selected template
    const selectedTemplateIndex = templates.findIndex(t => t.id === cvData.template);
    if (selectedTemplateIndex !== -1) {
      setCurrentIndex(Math.floor(selectedTemplateIndex / itemsPerPage) * itemsPerPage);
    }
  }, [cvData.template, itemsPerPage]);

  const handleTemplateChange = (templateId: number) => {
    const newTemplate = templates.find(e => e.id === templateId);
    if (newTemplate) {
      updateCVData({ ...cvData, template: templateId, color: newTemplate.colors[0] });
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + itemsPerPage) >= templates.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return Math.max(templates.length - itemsPerPage, 0);
      }
      return Math.max(0, prevIndex - itemsPerPage);
    });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const slideVariants = {
    hidden: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: (direction: number) => ({ x: direction > 0 ? -1000 : 1000, opacity: 0, transition: { duration: 0.5 } }),
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
            <WrapperH2Section title="Seleccionar modelo de CV" />

            <div className="relative">
              <motion.div
                className="flex transition-all duration-300 ease-in-out"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                custom={currentIndex > 0 ? 1 : -1}
              >
                {templates.slice(currentIndex, currentIndex + itemsPerPage).map((template) => (
                  <div key={template.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 p-2">
                    <div className="relative">
                      <input
                        type="radio"
                        id={`${template.id}`}
                        name="template"
                        value={template.id}
                        checked={cvData.template === template.id}
                        onChange={() => handleTemplateChange(template.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`${template.id}`}
                        className={`block cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                          cvData.template === template.id
                            ? "border-blue-500 ring-2 ring-blue-500"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <Image
                          width={100}
                          height={300}
                          src={template.image}
                          alt={`Template ${template.id}`}
                          className="w-full h-[300px] object-cover"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </motion.div>
              <button
                onClick={prevSlide}
                type="button"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 border dark:border-gray-300  border-gray-700 rounded-full p-2 focus:outline-none dark:bg-gray-400 dark:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 border dark:border-gray-300 border-gray-700 rounded-full p-2 focus:outline-none dark:bg-gray-400 dark:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2 capitalize text-black dark:text-white mt-6">
              Seleccionar color
            </h3>
            <div className="flex flex-wrap gap-2">
              {templates
                .find((t) => t.id === cvData.template)
                ?.colors.map((color) => (
                  <div key={color} className="relative p-2">
                    <input
                      type="radio"
                      id={color}
                      name="color"
                      value={color}
                      checked={cvData.color === color}
                      onChange={() => updateCVData({ ...cvData, color: color })}
                      className="sr-only"
                    />
                    <label
                      htmlFor={color}
                      className={`block w-8 h-8 rounded-full cursor-pointer transition-all ${
                        cvData.color === color
                          ? "ring-4 border-0 ring-offset-2 ring-blue-500"
                          : "border hover:ring-2 hover:ring-offset-2 hover:ring-blue-300"
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      <span className="sr-only">Color {color}</span>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </WrapperSectionInput>
      </WrapperSection>
    </motion.section>
  );
}

