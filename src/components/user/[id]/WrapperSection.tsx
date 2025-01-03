export default function WrapperSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transition-all duration-500">
        {children}
      </div>
    </>
  );
}
