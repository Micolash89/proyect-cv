import React from 'react'

export default function CountArrayForm({cantidad}: {cantidad: number}) {
  return (
    <div className='capitalize px-6 pt-4 text-left text-sm text-gray-900 dark:text-gray-300'>
        <p>
            Total agregados: {cantidad}
        </p>
    </div>
  )
}