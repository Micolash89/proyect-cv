import React from 'react'

export default function WrapperSectionInput({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="p-6 border-b dark:border-gray-700">
    {children}
    </div>
  )
}
