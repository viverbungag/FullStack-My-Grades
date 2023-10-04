import React from 'react'

const TableHead = ({children}) => {
  return (
    <th className="px-4 py-2 text-left text-gray-600 uppercase font-medium">{children}</th>
  )
}

export default TableHead