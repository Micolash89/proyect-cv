export default function WrapperButton({
  title,
  moveToNextSection,
  color,
}: {
  title: string;
  moveToNextSection: any;
  color: string;
}) {
  const icon : { [key: string]: JSX.Element }= {
    green:
        <svg
          className="w-6 h-6 transition-transform group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
     ,
    blue:
        <svg
          width={24}
          height={24}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>
     ,
};

  return (
    <div className={`flex `}>
      <button
        type="button"
        title={title}
        onClick={moveToNextSection}
        className={`inline-flex items-center gap-2 px-6 py-3 bg-${color}-500 hover:bg-${color}-600 
                      active:bg-${color}-700 text-white font-medium rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 capitalize`}
      >
        <span className="hidden sm:inline" >{title}</span>
        {icon[color]}
      </button>
    </div>
  );
}
