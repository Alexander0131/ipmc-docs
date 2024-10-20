import { AnswerPlatformType } from '@/types/global'
import React from 'react'
import AnswersList from './AllAns'

const LoadAllAns: React.FC<AnswerPlatformType> = ({ ansId, mainId}) => {
  return (
    <div className='bg-dark-3 rounded-[5px] m-1 p-1 max-h-[50vh] '>
        <div className='overflow-auto'>
            <AnswersList ansId={ansId}  mainId={mainId} />

        </div>
    </div>
  )
}

export default LoadAllAns