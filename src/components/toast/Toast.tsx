import clsx from "clsx";
import { useEffect, useState } from "react";

function Toast(
  state2: boolean | null,
  { data }: { data: { estado: any; message: string;state2:boolean | null } }
) {
  const [state, setState] = useState({
    estado: false,
    message: "",
  });

  useEffect(() => {
    if (state2) {
      setState({
        ...data,
      });
      console.log("dentre", state2);
    }
  }, [state2]);

  return (
    <>
      { (
        <div
          className={clsx(
            " flex flex-row  w-fit m-auto items-center justify-center p-2 border-solid border-black border-2 rounded-md bg-white toast",
            {
              "toast__animation": state2,
            }
          )}
        >
          <div className="w-8 ">
            {state.estado ? (
              <svg
                className="text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
              </svg>
            ) : (
              <svg
                className="text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
              </svg>
            )}
          </div>
          <p className="text-nowrap capitalize">{state.message}</p>
        </div>
      )}
    </>
  );
}

export default Toast;
