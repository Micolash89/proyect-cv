import React from 'react'

export default function WrapperSectionInput({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="px-6 pt-6 pb-2 border-b dark:border-gray-700">
    {children}
    </div>
  )
}
