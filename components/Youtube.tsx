// components/YoutubeEmbed.tsx
import { YoutubeEmbedProps } from '@/types/global';
import React from 'react';


const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId }) => {
  return (
    <div
        className='relative overflow-hidden h-[300px] w-full flex justify-center max-w-[450px]'
    >
      <iframe
         height="250" 
         src={`https://www.youtube.com/embed/${videoId}`}
         title="YouTube video player" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className='w-full max-w-[450px] rounded-xl'
      />
    </div>
  );
};

export default YoutubeEmbed;
