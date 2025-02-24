import { ArraySelectInput } from "@/lib/definitions";
import clsx from "clsx";

export default function SelectInputComponent({
  value,
  onChange,
  arrOptions,
  label,
  id,
  name,
  responseError,
  requiered,
}: {
  value: any;
  onChange: any;
  arrOptions: ArraySelectInput[];
  id: string;
  name: string;
  label: string;
  responseError?: boolean;
  requiered?: boolean;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2"
      >
        {label}{requiered && <sup>*</sup>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          className={clsx("block w-full px-3 py-2 text-base border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-colors duration-200",{
            "border-red-500 focus:border-red-500": !responseError,
            "border-gray-300 focus:border-gray-500 dark:border-gray-600": responseError
          })}
          onChange={onChange}
          value={value}
        >
          {arrOptions.map((e, i) => {
            return (
              <option key={`${e}-${i}`} value={e.value} hidden={e.value === ""}>
                {e.name}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
