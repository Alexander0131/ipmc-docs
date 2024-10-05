import Image from 'next/image'
import React from 'react'

const UnderConstruction = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
        <Image
            src="/images/webunder.gif"
            alt='under'
            height={30}
            width={30}
            className='w-[70%]'
        />
        <h1 className='text-white font-bold'>
        Page Under construction
        </h1>
    </div>
  )
}

export default UnderConstruction