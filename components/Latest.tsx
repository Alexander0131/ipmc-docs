'use client'; 

import "swiper/css"
import { post } from '@/constants/dataSample';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Latest() {
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
  const latestPost = post[post.length -1];

  return (
    <div className='flex flex-col justify-items-center items-center w-full xl:max-w-[270px]'>
        <div key={latestPost._id} className='w-full flex  items-center flex-col justify-items-center relative'>
          <Swiper 
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            className=' mySwiper flex justify-items-center items-center w-[90%] max-w-[450px]'>
            {latestPost.images.map(item => (
                <SwiperSlide key={item.id} className="flex items-end justify-items-end flex-col h-[200px] w-full">
                    <Image
                    src={item.link}
                    width={300}
                    height={20}
                    alt={'image'}
                    className='rounded-[7px] w-full'
                    />
                </SwiperSlide>
            )) }
          </Swiper>

          <h4 className='max-w-[270px] rounded p-1 text-left text-base font-normal'>{latestPost.desc}</h4>
        </div>
    </div>
  );
}
