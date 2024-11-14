import Link from "next/link";
import React from "react";

export default function Update({ id }: { id: number }) {
  return (
    <>
      <Link
        href={`/user/${id}`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Actualizar
      </Link>
    </>
  );
}
