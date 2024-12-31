export default function ErrorComponent({ arr }: { arr: string[] }) {
  console.log("dentre");

  return (
    <>
      {arr.map((e, i) => {
        return (
          <p className="text-red-500 text-sm mt-2 dark:text-red-300" key={i}>
            * {e}
          </p>
        );
      })}
    </>
  );
}
