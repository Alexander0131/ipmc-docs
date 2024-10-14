"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';


const AddItem = () => {
    const [askAQuest, setAskAQuest ] = useState(false)

    const { user } = useUser();
console.log(user?.publicMetadata.role!)
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger asChild>
                <Image
                src={'/icons/add-meeting.svg'}
                alt="add"
                height={32}
                width={32}
                />
                </SheetTrigger>
            <SheetContent side='bottom' className='border-none bg-dark-2'>

        <div className="text-white font-bold">
   <br/>
            <div className='flex flex-col items-start'>
                <Button className='bg-inherit w-full'>
                    Ask a question
                </Button>
                <Button className='bg-inherit w-full'>
                    Create a post
                </Button>
                <Button disabled={user?.publicMetadata.role === "student" || user?.publicMetadata.role === "instructor"} className='bg-inherit w-full'>
                    Add an Event
                </Button>
                <Button disabled={user?.publicMetadata.role === "student" || user?.publicMetadata.role === "instructor"} className='bg-inherit w-full'>
                    Place an Announcement
                </Button>
            </div>
                    
        </div>
        
            </SheetContent>
    
        </Sheet>
    </section>
  )
}

export default AddItem