"use client"
import MiniProfile from "@/components/MiniProfile";
import { getMeetings } from "@/fetchApi";
import { UpcomingType } from "@/types/global";
import { useEffect, useState } from "react";


const UpcomingPage =  () => {
  const [meetingData, setMeetingData] = useState<UpcomingType[] | null>(null);

  useEffect(() => {
    async function getData() {
      
      const MeetingRaw = await getMeetings('upcoming');
      setMeetingData(MeetingRaw)
      
    }
    getData();
  }, [])
// set Date
function setDate(params: string){
  const timeRaw = params.split("T")[1];
  const hh = timeRaw.split(":")[0]
  const mm = timeRaw.split(":")[1]
  const time = `${hh}:${mm}`;

// set Date
  const dateRaw = params.split("T")[0];
 const day = dateRaw.split("-")[2];
 const month = dateRaw.split("-")[1];
 const year = dateRaw.split("-")[0];

 const setDate = `${day+"-"+month+"-"+year}`;



 return time +" | " + setDate;
}

console.log(meetingData)

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming Meeting</h1>

      {/* <CallList type="upcoming" /> */}

      {meetingData && meetingData.map((item: UpcomingType) =>  (
        <div key={item.meetingId}  className="flex min-h-[258px] w-[96%] max-w-[450px] ml-5 flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
       <MiniProfile 
          userId={item.creatorId} 
          height={50} 
          width={50}
          username={true} 
          liveState={true} 
          img={true}
          textStyles={''}

          />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
              <h1 className="capitalize">{item.description}</h1>
            
              <h2>Time: <b className="text-base font-normal">{setDate(item.time)}</b></h2>
            
          </div>
        </div>
      </article>
        </div>
       ))}
       {meetingData ? meetingData.length < 0 &&
       <div>There is no upcoming meeting...</div>
       :
       <div>There is no upcoming meeting</div>
      }

    </section>
  );
};

export default UpcomingPage;
