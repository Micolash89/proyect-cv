"use client";
import { templates } from "@/lib/constTemplate";
import React from "react";
import ButtonToggleOptionPDF from "./ButtonToggleOptionPDF";
import { OptionsPDF } from "@/lib/definitions";
import WrapperH3 from "@/components/WrapperH3";

interface PdfOptionsProps {
  optionsPDF: OptionsPDF;
  setOptionsPDF: React.Dispatch<React.SetStateAction<OptionsPDF>>;
  contador: number;
  setContador: React.Dispatch<React.SetStateAction<number>>;
}

export const TextZoom: React.FC<PdfOptionsProps> = ({
  optionsPDF,
  setOptionsPDF,
  contador,
  setContador,
}) => {
  const handleTextZoomClick = (num: number) => {
    if (num === -1 && contador === 0) return;
    setContador(contador + num);
  };

  const handleTextZoomClickContent = (num: number) => {
    if (num === -1 && optionsPDF.contadorContent === 0) return;
    setOptionsPDF({
      ...optionsPDF,
      contadorContent: optionsPDF.contadorContent + num,
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionsPDF((prev) => ({
      ...prev,
      color: e.target.value,
    }));
  };

  const handleSpaceBetweenToggle = () => {
    setOptionsPDF((prev) => ({
      ...prev,
      spaceBetween: !prev.spaceBetween,
    }));
  };

  const orientacionCVTitleToggle = () => {
    setOptionsPDF((prev) => ({
      ...prev,
      orientacionCVTitle: !prev.orientacionCVTitle,
    }));
  };

  const handlePdfTypeChange = (direction: "prev" | "next") => {
    setOptionsPDF((prev) => ({
      ...prev,
      tipoPdf:
        direction === "next"
          ? prev.tipoPdf !== 8 - 1
            ? prev.tipoPdf + 1
            : 0
          : prev.tipoPdf !== 0
          ? prev.tipoPdf - 1
          : 7,
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6  transition-all duration-200">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <WrapperH3 title="Tamaño del Texto" />
            <div className="flex gap-2 flex-col lg:flex-row items-center">
              <div className="flex items-center flex-col justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2 w-fit">
                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Encabezado
                </h6>
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                  <button
                    onClick={() => handleTextZoomClick(-1)}
                    disabled={contador === 0}
                    className=" capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Disminuir tamaño"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-16 text-center text-lg font-semibold text-gray-900 dark:text-white">
                    {contador}
                  </span>
                  <button
                    onClick={() => handleTextZoomClick(1)}
                    className=" capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
                    aria-label="Aumentar tamaño"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center flex-col justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2 w-fit">
                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contenido
                </h6>
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                  <button
                    onClick={() => handleTextZoomClickContent(-1)}
                    disabled={optionsPDF.contadorContent === 0}
                    className=" capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Disminuir tamaño"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-16 text-center text-lg font-semibold text-gray-900 dark:text-white">
                    {optionsPDF.contadorContent}
                  </span>
                  <button
                    onClick={() => handleTextZoomClickContent(1)}
                    className=" capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
                    aria-label="Aumentar tamaño"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-gray-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <WrapperH3 title="Personalizar color" />

            <div className="flex items-center space-x-4">
              <div className="flex flex-wrap gap-2">
                {templates
                  .find((t) => t.id === optionsPDF.tipoPdf)
                  ?.colors.map((color, index) => (
                    <div key={color} className="relative p-2">
                      <input
                        type="radio"
                        id={`${color}${index}`}
                        name={`${color}${index}`}
                        value={color}
                        checked={optionsPDF.color === color}
                        onChange={handleColorChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`${color}${index}`}
                        className={`block w-8 h-8 rounded-full cursor-pointer  transition-all ${
                          optionsPDF.color === color
                            ? "ring-4 border-0 ring-offset-2 ring-blue-500 "
                            : "border-2 hover:ring-2 hover:ring-offset-2 hover:ring-blue-300 "
                        }`}
                        style={{ backgroundColor: color }}
                      ></label>
                    </div>
                  ))}
              </div>
              <input
                type="text"
                value={optionsPDF.color}
                onChange={handleColorChange}
                className=" text-lg font-mono bg-gray-100 dark:bg-gray-800  px-3 py-2 text-gray-700 dark:text-gray-300 rounded w-24"
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <WrapperH3 title="Ajustes de diseño" />

            <div className="flex items-center justify-center space-x-4 flex-wrap gap-y-4">
              <ButtonToggleOptionPDF
                conditionOption={optionsPDF.spaceBetween}
                messageTrue="Espaciado Amplio"
                messageFalse="Espaciado Normal"
                callBackFunction={handleSpaceBetweenToggle}
              />

              <ButtonToggleOptionPDF
                conditionOption={optionsPDF.orientacionCVTitle}
                messageTrue="Mostrar perfil de CV"
                messageFalse="Ocultar perfil de CV"
                callBackFunction={orientacionCVTitleToggle}
              />

              <ButtonToggleOptionPDF
                conditionOption={optionsPDF.reverseExperience}
                messageTrue="Experiencia orden normal"
                messageFalse="Experiencia orden inverso"
                callBackFunction={() => {
                  setOptionsPDF((prev) => ({
                    ...prev,
                    reverseExperience: !prev.reverseExperience,
                  }));
                }}
              />
              <ButtonToggleOptionPDF
                conditionOption={optionsPDF.reverseEducation}
                messageTrue="Educación orden normal"
                messageFalse="Educación orden inverso"
                callBackFunction={() => {
                  setOptionsPDF((prev) => ({
                    ...prev,
                    reverseEducation: !prev.reverseEducation,
                  }));
                }}
              />
              <ButtonToggleOptionPDF
                conditionOption={optionsPDF.reverseCursos}
                messageTrue={`Cursos orden normal`}
                messageFalse={`Cursos orden inverso`}
                callBackFunction={() => {
                  setOptionsPDF((prev) => ({
                    ...prev,
                    reverseCursos: !prev.reverseCursos,
                  }));
                }}
              />
              <ButtonToggleOptionPDF
                conditionOption={optionsPDF.fullName}
                messageTrue={`Nombre completo`}
                messageFalse={`Primer nombre y apellido`}
                callBackFunction={() => {
                  setOptionsPDF((prev) => ({
                    ...prev,
                    fullName: !prev.fullName,
                  }));
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3 items-center ">
            <WrapperH3 title="Diseño" />

            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
              <button
                onClick={() => handlePdfTypeChange("prev")}
                className="capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
                aria-label="Estilo anterior"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span className="w-24 text-center font-medium text-gray-900 dark:text-white">
                {optionsPDF.tipoPdf}
              </span>
              <button
                onClick={() => handlePdfTypeChange("next")}
                className="capitalize px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
                aria-label="Siguiente estilo"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
