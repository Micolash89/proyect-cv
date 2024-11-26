"use client";

import { revalidateFunction } from "@/lib/actions";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface NavigationLinksProps {
    url:string;
    name:string;
    icon1:string;
    icon2:string;
}

export default  function NavigationLinks({data}:{data:NavigationLinksProps}) {

  const router = useRouter();
  const pathname = usePathname();


  const handleRedirect = async () => {

    await revalidateFunction(data.url);
    router.refresh();
    router.push(data.url);

  }
    
  return (
    <>
      <button 
        onClick={handleRedirect}
        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors capitalize flex gap-1 items-center"
        title={data.url}
      >
            <div className={
          clsx({
            "text-blue-400": data.url === pathname,
          })
        } dangerouslySetInnerHTML={{ __html:data.url === pathname?  data.icon2:data.icon1  } } />

        <span className={
          clsx({
            "text-blue-400": data.url === pathname,
          })} >
        {data.name}
        </span>

      </button>
    </>
  );
}
