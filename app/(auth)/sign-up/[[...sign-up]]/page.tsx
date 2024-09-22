import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='flex h-screen flex-center w-full'>
        <SignUp />
    </main>
  )
}

export default SignUpPage