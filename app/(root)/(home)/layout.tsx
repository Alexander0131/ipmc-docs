import CheckUser from '@/checkUserRole';
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "IPMC DOCS",
  description: "BUILT BY ACID",
  icons: '/icons/logo-ipmc.png'
};

const HomeLayout = ({ children }: {children: ReactNode }) => {

  
  return (
    <main className='relative'>
        <Navbar />
        <CheckUser/>

        <div className="flex">
            <Sidebar />

            <section className='flex w-[95%] min-h-screen flex-1 flex-col pt-28'>
                <div className='w-full'>
                    {children}

                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout