import React from 'react'

function Header() {
  return (
    <div>
       <div className='bg-blue-500 flex items-center py-5 justify-between px-10'>
        <div className='text-white font-bold text-2xl'>MindSpace</div>
         <div className='menu text-white flex items-center list-none '>
            <li className='px-6 font-bold'>Home</li>
            <li className='px-6 font-bold'>About</li>
         </div>
       </div>
    </div>
  )
}

export default Header
