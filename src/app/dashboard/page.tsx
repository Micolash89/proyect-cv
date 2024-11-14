// import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/Search";
import Table from "@/components/dashboard/Table";
import { fetchInvoicesPages } from "@/database/database";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        {/* <h1 className={`${Lusitana.className} text-2xl`}>Invoices</h1> */}
        <h1 className={` text-2xl`}>Lista de Registros</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar por nombre" />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={
          <>
            <p>...cargando</p>
          </>
        }
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
