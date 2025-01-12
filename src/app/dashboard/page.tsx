import ErrorDatabase from "@/components/dashboard/ErrorDataBase";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import Table from "@/components/dashboard/Table";
import { TableUserSkeleton } from "@/components/skeletons";
import { fetchRegistrosPages } from "@/database/database";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  let totalPages;
  try {
    totalPages = await fetchRegistrosPages(query);
  } catch (error) {
    return (
      <>
        <ErrorDatabase/>
      </>
    );
  }
  
  return (
    <section className="container mx-auto w-full my-5 ">
      <div className="w-full flex-grow p-5 lg:p-5 bg-white dark:bg-gray-900 rounded-lg shadow-md duration-500">
        <h1
          className={` text-black dark:text-white text-2xl lg:text-4xl font-bold text-center lg:text-left`}
        >
          Lista de Registros
        </h1>
        <div className="mt-4 flex items-center justify-between gap-40 max-lg:gap-3">
          <Search placeholder="Buscar por nombre, apellido, email o dni" />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={
            <>
              <TableUserSkeleton />
            </>
          }
        >
          <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </section>
  );
}
