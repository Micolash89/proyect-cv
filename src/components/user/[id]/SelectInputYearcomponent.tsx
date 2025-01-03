import React from 'react';

interface SelectInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Seleccione una opción"
}) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400 capitalize"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
    </div>
  );
};

export default SelectInput;

