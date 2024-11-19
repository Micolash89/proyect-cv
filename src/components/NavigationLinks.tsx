import Link from "next/link";
import React from "react";

export interface NavigationLinksProps {
    url:string;
    name:string;
}

export default function NavigationLinks({data}:{data:NavigationLinksProps}) {
  return (
    <>
      <Link
        href={data.url}
        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors capitalize"
      >
        {data.name}
      </Link>
    </>
  );
}
