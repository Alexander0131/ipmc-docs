import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex h-screen flex-center w-full'>
        <SignIn />
    </main>
  )
}

export default SignInPage