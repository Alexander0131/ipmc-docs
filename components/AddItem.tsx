"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import AddModal from './AddModal';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';
import MeetingTypeList from './MeetingTypeList';

 
const AddItem = () => {
    const [openState, setOpenState] =  useState(false);
    const { user } = useUser();

    function redirectorA() {
        if (typeof window !== 'undefined') {
          window.location.href = "/askaquestion";
        }
      }
      
  return (
    <div className='container relative'>
        <Image
            src={'/icons/add-meeting.svg'}
            alt="add"
            height={32}
            width={32}
            className='absolute right-0 bottom-0 translate-y-[50%]'
            onClick={() => setOpenState(!openState)}
        />
        <AddModal
          isOpen={openState}
          onClose={() => setOpenState(false)}
        >
            <div>
            <div className='flex gap-3 flex-wrap items-start justify-center'>
            <Button className='bg-inherit border-2 border-gray-600 h-[60px] flex flex-col items-center justify-center' onClick={() => redirectorA()}>
                <Image
                src={'/icons/question.svg'}
                alt='question'
                height={17}
                width={17}
                />
                Ask a question
            </Button>
            {user?.publicMetadata.role !== "student" && user?.publicMetadata.role !== "instructor" &&
                <Button className='bg-inherit border-2 border-gray-600 h-[60px] flex flex-col items-center justify-center'>
                <Image
                src={'/icons/event.svg'}
                alt='question'
                height={17}
                width={17}
                />
                    Add an Event
                </Button>
            }
            {user?.publicMetadata.role !== "student" && user?.publicMetadata.role !== "instructor" &&
                <Button className='bg-inherit border-2 border-gray-600 h-[60px] flex flex-col items-center justify-center'>
                <Image
                src={'/icons/announcement.svg'}
                alt='question'
                height={17}
                width={17}
                />
                    Place an Announcement
                </Button>
                }
                <MeetingTypeList/>
            </div>
            </div>
        </AddModal>

    </div>
  )
}

export default AddItem