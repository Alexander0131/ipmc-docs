'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-inherit border-2 border-gray-600 h-[50px] flex gap-3 w-full items-center justify-center p-3 rounded-[10px]',
        className
      )}
      onClick={handleClick}
    >
        <Image src={img} alt="meeting" width={27} height={27} />
      
      <div className="flex gap-2 justify-start w-full">
        <b className="font-bold">{title} </b> |
        <p className="font-normal"> {description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
