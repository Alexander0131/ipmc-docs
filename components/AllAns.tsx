import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { answerArray } from '@/app/models/Answers';
import { AnswerPlatformType } from '@/types/global';
import MiniLoader from './MiniLoader';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { deleteAns, getAnswer, likeAnAns } from '@/fetchApi';
import MiniProfile from './MiniProfile';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';

const AnswersList: React.FC<AnswerPlatformType> = ({ ansId, mainId }) => {
  const [answers, setAnswers] = useState<answerArray[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [likedIn, setLikedIn] = useState<{ [key: string]: boolean }>({});
  const [unLikedIn, setUnLikedIn] = useState<{ [key: string]: boolean }>({});
  const [openDelDailog, setOpenDelDailog] = useState(false);
  const  [delId, setDelId] = useState<string>('');
  const  [delAns, setDelAns] = useState<string>('');



  const { user } = useUser();

  
  const fetchAnswers = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/questandans/answer/multipleans`,
        {
          params: {
            q: ansId,
            page: page,
            limit: 10,
          },
        }
      );

      const { data, totalPages } = response.data;

      setAnswers((prevAnswers) => {
        const newAnswers = data.filter(
          (answer: answerArray) => !prevAnswers.some((a) => a.id === answer.id)
        );

        const updatedLikedIn: { [key: string]: boolean } = {};
        const updatedUnLikedIn: { [key: string]: boolean } = {};

        newAnswers.forEach((answer: answerArray) => {
          updatedLikedIn[answer.id] = answer.like.includes(user?.id!);
          updatedUnLikedIn[answer.id] = answer.unlike.includes(user?.id!);
        });

        setLikedIn((prev) => ({ ...prev, ...updatedLikedIn }));
        setUnLikedIn((prev) => ({ ...prev, ...updatedUnLikedIn }));

        return [...prevAnswers, ...newAnswers];
      });

      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching answers:', error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAnswers(currentPage);
  }, [currentPage]);

  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if (!fetching && currentScroll + 100 >= scrollHeight && currentPage < totalPages) {
      setFetching(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages, fetching]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 300);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [handleScroll]);

  async function likeState(state: boolean, answer: answerArray) {
    if (!answer || !user) return;

    // If the user is unliking an answer they liked
    if (state) {
      setAnswers((prev) =>
        prev.map((a) =>
          a.id === answer.id
            ? {
                ...a,
                like: a.like.filter((item) => item !== user?.id),
              }
            : a
        )
      );
    } else {
      setAnswers((prev) =>
        prev.map((a) =>
          a.id === answer.id
            ? {
                ...a,
                like: [...a.like, user?.id!],
                unlike: a.unlike.filter((item) => item !== user?.id), // Remove from unlike if already unliked
              }
            : a
        )
      );
    }

    setLikedIn((prev) => ({
      ...prev,
      [answer.id]: !state,
    }));

    setUnLikedIn((prev) => ({
      ...prev,
      [answer.id]: false,
    }));

    postNewReaction(
      state ? answer.like.filter((item) => item !== user?.id) : [...answer.like, user?.id!],
      answer.unlike.filter((item) => item !== user?.id!),
      answer
    );
  }

  async function unLikeState(state: boolean, answer: answerArray) {
    if (!answer || !user) return;

    // If the user is unliking an answer they unliked
    if (state) {
      setAnswers((prev) =>
        prev.map((a) =>
          a.id === answer.id
            ? {
                ...a,
                unlike: a.unlike.filter((item) => item !== user?.id),
              }
            : a
        )
      );
    } else {
      setAnswers((prev) =>
        prev.map((a) =>
          a.id === answer.id
            ? {
                ...a,
                unlike: [...a.unlike, user?.id!],
                like: a.like.filter((item) => item !== user?.id), // Remove from like if already liked
              }
            : a
        )
      );
    }

    setUnLikedIn((prev) => ({
      ...prev,
      [answer.id]: !state,
    }));

    setLikedIn((prev) => ({
      ...prev,
      [answer.id]: false,
    }));

    postNewReaction(
      answer.like.filter((item) => item !== user?.id!),
      state ? answer.unlike.filter((item) => item !== user?.id) : [...answer.unlike, user?.id!],
      answer
    );
  }

  async function postNewReaction(newLike: string[], newUnLike: string[], answer: answerArray) {
    const ansArray = await getAnswer(ansId);
    const mainAnsId = ansArray[0]._id;

    if (answer && mainAnsId) {
      const answerForm: answerArray = {
        id: answer.id,
        userId: answer.userId,
        ans: answer.ans,
        like: newLike,
        unlike: newUnLike,
      };
      const dataMove = {
        id: mainAnsId,
        params: answerForm,
      };
      await likeAnAns(dataMove);
    }
  }

  // delete an answer
  function deleteReq(params: string, paramName: string){
    setOpenDelDailog(true)
    setDelId(params)
    setDelAns(paramName)
  }

  async function deleteThisAns(){
    try {
      deleteAns(delId, ansId);
    } catch (error) {
      console.log(error)
    }
  }





  return (
    <div className='flex items-center justify-center'>
      <ul className='flex w-full flex-col gap-2 '>
      <p className='text-[#555] text-center italic'>All answers &#40;{answers.length}&#41;</p>

        {answers.map((answer) => (
          <li key={answer.id} 
          onDoubleClick={answer.userId === user?.id ? () => deleteReq(answer.id, answer.ans) : undefined}


            className='flex w-full items-center gap-1 rounded-sm hover:bg-dark-2'
          >
            <MiniProfile 
              username={false} 
              liveState={false} 
              img={true} 
              userId={answer.userId}  
              width={28} 
              height={28}
              textStyles={''}

            />

            <div  className='flex w-full justify-between'>

             <div className='flex flex-col gap-0'>
              <MiniProfile 
                username={true} 
                liveState={false} 
                img={false} 
                userId={answer.userId}  
                width={28} 
                height={28}
                textStyles={'text-[12px] font-normal mb-[2px]'}
              />

              <p className='mt-[-6px] text-[16px] font-normal'>{answer.ans}</p>
             </div>
              <div className='flex items-center justify-center gap-2  '>
                <span className="flex items-center justify-center gap-1">
                  <Image
                    src={likedIn[answer.id] ? "/icons/liked.svg" : "/icons/like.svg"}
                    alt="like"
                    height={20}
                    width={20}
                    className="cursor-pointer"
                    onClick={() => likeState(likedIn[answer.id], answer)}
                  />
                  <p>
                    {answer.like.length}
                  </p>
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Image
                    src={unLikedIn[answer.id] ? "/icons/unliked.svg" : "/icons/unlike.svg"}
                    alt="unlike"
                    height={20}
                    width={20}
                    className="cursor-pointer"
                    onClick={() => unLikeState(unLikedIn[answer.id], answer)}
                  />
                  <p>
                    {answer.unlike.length}
                  </p>
                </span>
              </div>
            </div>


           



          </li>
        ))}
      </ul>
      {loading && <MiniLoader />}

                <Dialog open={openDelDailog} onOpenChange={() => setOpenDelDailog(false)}>
                  <DialogContent className="flex w-[86%] max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                    <div className="flex flex-col gap-6 text-center justify-center">
                      Are you sure you want to  delete this answer?<br/>
                      &quot;{delAns}&quot;
                      <Button 
                        className='bg-blue-1' 
                        onClick={() => deleteThisAns()}
                        >
                        <span className="text-[16px] font-bold ">Delete</span>
                      </Button>
                      
                    </div>
                  </DialogContent>
                </Dialog>

    </div>
  );
};

export default AnswersList;
