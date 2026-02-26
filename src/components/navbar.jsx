import React from 'react'


const navbar = () => {
  return (
      <nav className='bg-gray-700 text-white flex justify-around h-14 items-center'> 
      <div className="logo flex items-center leading-none font-bold text-[1.6rem] pb-1 "><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OG&#47;&gt;</span></div>
     <a href='https://github.com/virat-pod' target='_blank' className="gitAuth cursor-pointer flex items-center gap-2 bg-green-700 hover:bg-green-800 p-1 pr-1.5 rounded-full font-medium border border-zinc-500"><object className='w-8' data="/icons/github.svg"></object>Github</a>
      </nav>
  )
}

export default navbar
