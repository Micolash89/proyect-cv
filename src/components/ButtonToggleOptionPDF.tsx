import React from "react";

export default function ButtonToggleOptionPDF({
  conditionOption,
  messageTrue,
  messageFalse,
  callBackFunction,
}: {
  conditionOption: boolean;
  messageTrue: string;
  messageFalse: string;
  callBackFunction: any;
}) {
  return (
    <>
      <div className=" text-center flex max-w-[144px] min-w-[144px] bg-gray-100 dark:bg-gray-800 p-3 rounded-lg items-center flex-col gap-3  ">
        <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
          <strong className="font-bold">
            {conditionOption
              ? `${messageTrue.split(" ")[0]} `
              : `${messageFalse.split(" ")[0]} `}
          </strong>
          {conditionOption
            ? messageTrue.split(" ").slice(1).join(" ")
            : messageFalse.split(" ").slice(1).join(" ")}
        </span>
        <button
          onClick={callBackFunction}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 border-gray-50 border focus:ring-blue-500 focus:ring-offset-2 ${
            conditionOption ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
              conditionOption ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </>
  );
}
