import clsx from "clsx"

export default function AnimationDot( {state}:{state?:boolean} ) {
    return (
      <>
       <div className="absolute right-1/2 top-1/2">
              <span className="relative flex h-3 w-3">
                <span className={clsx( " absolute inline-flex h-full w-full rounded-full  opacity-75",{
                    "bg-red-400 animate-ping":!state,
                    "bg-green-500":state
                })}></span>
                <span className={clsx("relative inline-flex rounded-full h-3 w-3 ",{
                    "bg-red-500":!state,
                    "bg-green-500":state
                })}></span>
              </span>
        </div> 
      </>
    )
  }