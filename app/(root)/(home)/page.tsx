import Latest from '@/components/Latest';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = async () => {


  const now = new Date();

  const time = now.toLocaleTimeString('en-US', {hour:'2-digit', minute: '2-digit'});
  const date = (new Intl.DateTimeFormat('en-Us', { dateStyle: 'full'}).format(now))

  return (
    <section className='flex size-full flex-col gap-10 text-white w-full pb-10'>
        <Latest/>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max:py-8 p-5 lg:p-11 '>
          <h2></h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home