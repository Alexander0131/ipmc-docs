import Image from 'next/image'
import React from 'react'

const UnderConstruction = () => {
  return (
    <div className='flex justify-center h-[60vh] items-center flex-col'>
        <Image
            src="/images/webunder.gif"
            alt='under'
            height={60}
            width={60}
            className='w-[90%]'
        />
        <h1 className='text-white font-bold'>
        Page Under construction
        </h1>
    </div>
  )
}

export default UnderConstruction