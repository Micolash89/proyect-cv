export default function YearSelect({name, value, callback}:{ name: string, value: string, callback: any}) {
  const max = new Date().getFullYear();
  const min = max - 50;

  const arr: string[] = [];

  for (let i = max; i >= min; i--) {
    arr.push(i.toString());
  }

  return (
    <>
      <select
        name={name}
        className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
        value={value}
        onChange={callback}
      >
        <option value={""} hidden>
          Seleccione año
        </option>

        {arr.map((e, i) => {
          return (
            <option key={`${e}-${i}`} value={e}>
              {e}
            </option>
          );
        })}
      </select>
    </>
  );
}
