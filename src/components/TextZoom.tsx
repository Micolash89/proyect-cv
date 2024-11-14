"use client";

interface TextZoomProps {
  contador: number;
  setContador: React.Dispatch<React.SetStateAction<number>>;
}

const TextZoom: React.FC<TextZoomProps> = ({ contador, setContador }) => {
  const handleClick = (num: number) => {
    if (num == -1 && contador == 0) return;

    setContador(contador + num);
  };

  return (
    <>
      <div className="w-full max-w-xs mx-auto my-6">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-black text-center dark:text-white mb-4">
            Tamaño del Texto
          </h3>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleClick(-1)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={contador === 0}
            >
              <span className="sr-only">Disminuir</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {contador}
            </span>
            <button
              onClick={() => handleClick(1)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="sr-only">Aumentar</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
          <div className="text-sm">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Ajusta el tamaño del texto del CV
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TextZoom;
