import React from 'react'

const Loader = () => {
  return (
    // Loader using Tailwind CSS without fas

    <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
    </div>

  )
}

export default Loader
