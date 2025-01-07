import React from 'react';
import SelectInput from './SelectInputYearcomponent';


interface YearSelectProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startYear: number;
  endYear: number;
  disabled?: boolean;
  placeholder?: string;
  includeActualidad?: boolean;
  required?: boolean;
  responseError?: boolean;
}

const YearSelect: React.FC<YearSelectProps> = ({
  name,
  label,
  value,
  onChange,
  startYear,
  endYear,
  disabled = false,
  placeholder = "Seleccione año",
  includeActualidad = false,
  required = false,
  responseError = true,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).reverse();
  
  const options = [
    ...(includeActualidad ? [{ value: "Actualidad", label: "Actualidad" }] : []),
    ...years.map(year => ({ value: year.toString(), label: year.toString() }))
  ];

  return (
    <SelectInput
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      options={options}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      responseError={responseError}
    />
  );
};

export default YearSelect;

