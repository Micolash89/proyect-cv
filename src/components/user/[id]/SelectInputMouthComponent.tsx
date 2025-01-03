import React from 'react';
import SelectInput from './SelectInputYearcomponent';

interface MonthSelectProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MonthSelect: React.FC<MonthSelectProps> = ({
  name,
  label,
  value,
  onChange,
  disabled = false,
  placeholder = "Seleccione mes"
}) => {
  const months = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" }
  ];

  return (
    <SelectInput
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      options={months}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default MonthSelect;

