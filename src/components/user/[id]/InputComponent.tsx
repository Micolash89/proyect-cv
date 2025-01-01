import clsx from "clsx";

export default function InputComponent({
  name,
  value,
  onChange,
  onKeyDown,
  id,
  responseError,
  content,
  requiered,
  type
}: {
  name: string;
  value: string;
  onChange: any;
  onKeyDown: any;
  id: string;
  responseError: number;
  content: string;
  requiered: boolean;
  type: string;
}) {
  return (
    <div className="relative z-0 w-full group">
      <input
        type={type}
        name={name}
        id={id}
        className={clsx(
          "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 dark:text-white  appearance-none    dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          {
            "border-red-500": responseError,
            " border-gray-300 dark:border-gray-600": !responseError,
          }
        )}
        placeholder=" "
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {content}
        {requiered && <sup>*</sup>}
      </label>
    </div>
  );
}
