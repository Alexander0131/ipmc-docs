"use client";
import { getHomeQuetions } from '@/fetchApi';
import { HomeQuests } from '@/types/global';
import React, { useEffect, useState } from 'react';
import MiniProfile from './MiniProfile';
import AnswerPlatform from './AnswerPlatform';
import MiniLoader from './MiniLoader';

const HomeQuest = () => {
  const [questData, setQuestData] = useState<HomeQuests[] | null>(null); // Ensure it's an array or null

  useEffect(() => {
    async function getData() {
        try {
            
      
      const data = await getHomeQuetions(); 
      if (data) setQuestData(data); // Set the state if data exists
      } catch (error) {
            console.log(error)
        }
    }
    getData(); // Call the async function
  }, []);

  return (
    <div>
      <h2>Latest Questions</h2>

      <div>
        {questData ? (
          questData.map((item: HomeQuests) => (
            <div key={item._id} className='bg-dark-1 rounded-[10px] m-2 p-2 '>
              <MiniProfile userId={item.asker} height={32} width={32}/>
                <div className='ml-3'>
                    <h3>{item.question}</h3>
                    <b>
                        <AnswerPlatform ansId={item.answerId} mainId={item._id} />
                    </b>
                </div>
            </div>
          ))
        ) : (
          <MiniLoader />
        )}
      </div>
    </div>
  );
};

export default HomeQuest;
