import React from 'react'

const footer = () => {
  return (
    <div className='bg-gray-700 py-1 h-14 text-white flex flex-col items-center'>
       <div className="logo flex items-center leading-none font-bold text-2xl pb-1 "><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OG&#47;&gt;</span></div>
       <div className='text-zinc-100 font-medium'>Created With 🔪 by <span className='hover:text-purple-400  cursor-pointer'><a href="https://github.com/virat-pod" target='_blank'>ViratPod</a></span></div>
    </div>
  )
} 

export default footer
