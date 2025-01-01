import Link from "next/link";

export default function Update({ id }: { id: number }) {
  return (
    <>
      <Link
        href={`/user/${id}`}
        className="px-2 py-2 text-black dark:text-white rounded hover:bg-gray-50 dark:hover:bg-gray-700 duration-500 border-gray-300 dark:border-white border "
      >
         <svg className="w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
          </svg>
        </svg>
      </Link>
    </>
  );
}
