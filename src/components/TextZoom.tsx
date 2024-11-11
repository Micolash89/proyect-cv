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
      <div className="w-full my-4 ">
        <div className="flex  items-center  text-white font-bold justify-center">
          <button className="border p-3  rounded-l-md bg-blue-600  hover:bg-blue-800" onClick={() => handleClick(-1)}>-</button>
          <span className="border text-black  p-3">Ampliar Texto</span>
          <button className="border p-3  rounded-r-md bg-blue-600  hover:bg-blue-800" onClick={() => handleClick(1)}>+</button>
        </div>
      </div>
    </>
  );
};

export default TextZoom;
