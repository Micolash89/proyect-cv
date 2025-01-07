import clsx from "clsx";
import React from "react";

interface SelectInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  responseError?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Seleccione una opción",
  required = false,
  responseError = true,
}) => {
  return (
    <div className="w-full gap-2 flex flex-col relative">
      <label
        htmlFor={name}
        className="block  w-full text-xs font-medium text-gray-900 dark:text-gray-400 capitalize"
      >
        {label}{required && <sup>*</sup>}
      </label>
      <div className="relative">
        <select
          name={name}
          id={name}
          className={clsx(
            "w-full px-3 py-2 border text-sm rounded-md dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white focus:border-transparent appearance-none ",
            {
              "border-red-500 focus:border-red-500": !responseError,
              "border-gray-300 focus:border-gray-500 dark:border-gray-600": responseError,
              
            
            }
          )}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="" hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
};

export default SelectInput;