'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  CancelCallButton,
  PaginatedGridLayout,
  ReactionsButton,
  RecordCallButton,
  ScreenShareButton,
  SpeakerLayout,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const [showMbLog, setShowMbLog] = useState(false)

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  function changeShowState(state: true | false ){
    console.log("first")
    setShowMbLog(state)
    console.log({showMbLog})
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white flex items-center justify-center flex-col">
      <div className='md:hidden fixed w-[97%] top-2 rounded-[20px] flex items-center justify-between p-2 bg-dark-1'>
      

        <div className='flex gap-3 items-center'>
          {showMbLog && 
          <div className='flex gap-3 overflow-x-auto'>
            <RecordCallButton/>
            <ReactionsButton/>
            <ScreenShareButton/>
            <CallStatsButton />
            <button onClick={() => setShowParticipants((prev) => !prev)}>
              <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                <Users size={20} className="text-white" />
            </div>
         </button>
         <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
          </div>
        }
         <Button
            className={`p-0 m-0 rounded-[50px] h-[32px] bg-red-700 transform transition-transform `}
            onClick={() => changeShowState(!showMbLog)}
            >
          <Image
            src='/icons/circle-arrow-right-solid.svg'
            alt="arrow"
            width={32}
            height={32}
            className={`${
              showMbLog ? 'rotate-180' : 'rotate-0'
            }`}
            
            />
        </Button>
        </div>
        <CancelCallButton onLeave={() => router.push(`/`)}/>
    
      </div>
      <div className="relative flex size-full items-center justify-center w-full h-[80vh]">
        <div className="flex size-full max-w-[1000px] items-center justify-center w-[98%]">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants,
          })}
          >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      
      <div className='hidden md:flex w-full fixed bottom-[20px] items-center justify-center'>

      <div className="">
        <CallControls onLeave={() => router.push(`/`)} />
          </div>

          <div className='flex items-center justify-center'>
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
      </div>


      <div className='flex fixed bottom-3 items-center justify-center gap-2 md:hidden'>
            <ToggleVideoPreviewButton/>
            {!isPersonalRoom && <EndCallButton />}
            <ToggleAudioPreviewButton/>
      </div>
    </section>
  );
};

export default MeetingRoom;
