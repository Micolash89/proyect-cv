"use client";
import { deleteOneUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteButton({
  id,
  mensajeEliminar,
}: {
  id: number;
  mensajeEliminar: string;
}) {
  const router = useRouter();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleDelete = async (e: FormData) => {
    const newPost = deleteOneUser.bind(null, id);

    const postPromise = newPost(e);

    toast.promise(postPromise, {
      loading: `Eliminando Usuario ${id}`,
      success: (data) => {
        if (!data.success) {
          throw new Error(data.message);
        }

        router.refresh();

        return `${data.message}`;
      },
      error: (err) => `${err.message}`,
    });
  };

  const showConfirmation = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <>
      <form action={handleDelete} className="relative">
        <button
          onClick={showConfirmation}
          title={`eliminar ${id}`}
          className="px-2 py-2 text-black dark:text-white rounded hover:bg-gray-50 hover:text-red-500 hover:dark:text-red-500 dark:hover:bg-gray-700 duration-500 border-gray-300 dark:border-white border"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
          </svg>
        </button>
        {isConfirmationVisible && (
          <div className="absolute right-0 mt-2 p-4 bg-white dark:bg-slate-600 border border-gray-200 rounded-md shadow-lg z-10">
            <p className="mb-2">
              ¿Estás seguro de que quieres eliminar{" "}
              {mensajeEliminar ? mensajeEliminar : "este elemento"}?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={hideConfirmation}
                className="px-3 py-1 text-sm bg-gray-50 rounded text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
