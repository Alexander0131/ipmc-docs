import Latest from '@/components/Latest';
import MeetingTypeList from '@/components/MeetingTypeList';
import YoutubeEmbed from '@/components/Youtube';
// import { dbConnect } from '@/lib/mongodb';
  

const Home = async () => {
  // await dbConnect;

  

  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  return (
    <section className="flex flex-col  gap-10 pb-10 size-full text-white w-full">
      <div className='flex flex-wrap items-center justify-center gap-5 w-full'>
        <Latest />
        <YoutubeEmbed 
        videoId='v-RD1Tew-3Q?si=kjwjnGK5nSnb3-C9'
        />
        </div>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max:py-8 p-5 lg:p-11 '>
          <h2></h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
