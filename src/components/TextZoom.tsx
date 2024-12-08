"use client";
import React from "react";

interface PdfOptionsProps {
  optionsPDF: {
    color: string;
    spaceBetween: boolean;
    tipoPdf: number;
  };
  setOptionsPDF: React.Dispatch<
    React.SetStateAction<{
      color: string;
      spaceBetween: boolean;
      tipoPdf: number;
    }>
  >;
  contador: number;
  setContador: React.Dispatch<React.SetStateAction<number>>;
}

const TextZoom: React.FC<PdfOptionsProps> = ({
  optionsPDF,
  setOptionsPDF,
  contador,
  setContador,
}) => {
  const handleTextZoomClick = (num: number) => {
    if (num === -1 && contador === 0) return;
    setContador(contador + num);
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

  const handlePdfTypeChange = () => {
    const newType = optionsPDF.tipoPdf !== 6 ? optionsPDF.tipoPdf + 1 : 0;
    setOptionsPDF((prev) => ({
      ...prev,
      tipoPdf: newType,
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-5 ">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Opciones de PDF</h2>
        
        {/* Text Zoom */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Tamaño Texto
          </span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleTextZoomClick(-1)}
              className="p-2 bg-blue-600 text-white rounded-md disabled:opacity-50 transition-opacity duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={contador === 0}
              aria-label="Disminuir tamaño de texto"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 w-8 text-center">
              {contador}
            </span>
            <button
              onClick={() => handleTextZoomClick(1)}
              className="p-2 bg-blue-600 text-white rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Aumentar tamaño de texto"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Color PDF
          </span>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={optionsPDF.color}
              onChange={handleColorChange}
              className="w-10 h-10 border-none rounded-full cursor-pointer"
              aria-label="Seleccionar color de PDF"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {optionsPDF.color}
            </span>
          </div>
        </div>

        {/* Space Between */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Espacio Párrafos
          </span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={optionsPDF.spaceBetween}
              onChange={handleSpaceBetweenToggle}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 transition-colors duration-200 ease-in-out">
              <div className="absolute top-[2px] left-[2px] bg-white border rounded-full h-5 w-5 transition-all peer-checked:translate-x-full"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              {optionsPDF.spaceBetween ? 'Activado' : 'Desactivado'}
            </span>
          </label>
        </div>

        {/* PDF Type */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Tipo PDF
          </span>
          <button
            onClick={handlePdfTypeChange}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Tipo {optionsPDF.tipoPdf}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextZoom;

