"use client";
import { answerArray } from '@/app/models/Answers';
import { getAnswer, likeAnAns, postAnAns, postNewAns } from '@/fetchApi';
import { AnswerDisType, AnswerPlatformType } from '@/types/global';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useUser } from '@clerk/nextjs';

const AnswerPlatform: React.FC<AnswerPlatformType> = ({ ansId, mainId }) => {
  const [ansData, setAnsData] = useState<AnswerDisType | null>(null);
  const [bestAns, setBestAns] = useState<answerArray | null>(null);
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [userUnLiked, setUserUnLiked] = useState(false);
  const [mainAnsId, setMainAnsId] = useState<string | null>(null);
  const [ansIsOk, setAnsIsOk] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { user } = useUser();

  useEffect(() => {
    async function fetchThisAns() {
      try {
        const thisAnsData = await getAnswer(ansId);
        if (thisAnsData && thisAnsData.length > 0) {
          setMainAnsId(thisAnsData[0]._id);

          const mainAns = thisAnsData[0].answers;
          if (mainAns && mainAns.length > 0) {
            const bestAnsRaw = mainAns.sort(
              (a: answerArray, b: answerArray) => b.like.length - a.like.length
            )[0];

            const findLike = bestAnsRaw.like.find((item: string) => item === user?.id);
            const findUnLike = bestAnsRaw.unlike.find((item: string) => item === user?.id);

            setLiked(!!findLike);
            setUnLiked(!!findUnLike);
            setUserLiked(!!findLike);
            setUserUnLiked(!!findUnLike);
            setBestAns(bestAnsRaw);
          } else {
            console.log("No answers found");
            setBestAns(null);
          }
        } else {
          console.log("No answer data found");
          setMainAnsId(null);
        }
        setAnsData(thisAnsData);
      } catch (error) {
        console.error("Error fetching answers", error);
        setMainAnsId(null);
      }
    }
    fetchThisAns();
  }, [ansId]);

  async function likeState(state: boolean) {
    if (!bestAns || !user) return;
    
    setLiked(!state);
    setUnLiked(false);

    const likes = bestAns?.like || [];
    const newLike = state
      ? likes.filter((item) => item !== user?.id)
      : [...likes, user?.id!];

    const unlikeData = bestAns?.unlike.filter((item) => item !== user?.id!) || [];
    postNewReaction(newLike, unlikeData);
  }

  async function unLikeState(state: boolean) {
    if (!bestAns || !user) return;

    setUnLiked(!state);
    setLiked(false);

    const unlikes = bestAns?.unlike || [];
    const newUnLike = state
      ? unlikes.filter((item) => item !== user?.id)
      : [...unlikes, user?.id!];

    const likeData = bestAns?.like.filter((item) => item !== user?.id!) || [];
    postNewReaction(likeData, newUnLike);
  }

  async function postNewReaction(newLike: string[], newUnLike: string[]) {
    if (bestAns && mainAnsId) {
      const answer: answerArray = {
        id: bestAns.id,
        userId: bestAns.userId,
        ans: bestAns.ans,
        like: newLike,
        unlike: newUnLike,
      };
      const dataMove = {
        id: mainAnsId,
        params: answer,
      };
      await likeAnAns(dataMove);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setAnsIsOk(value.length > 1);
  };

  async function addAnAns() {
    if (!bestAns || !user || !ansId) {
      console.log("Cannot add answer: Data is missing");
      console.log({user})
      console.log({bestAns})
      console.log({ansId})
    //   return;
    }
if(user){

    if(!bestAns){
        
        
        const answers: answerArray = {
            id: "1",
            userId: user.id,
            ans: inputValue,
            like: [],
            unlike: [],
        };
        
        // const dataMove = {
            //     questionId: ansId,
            //     answers: answer,
            // };
            
            await postNewAns(ansId, answers);
        }else{
            
            const answer: answerArray = {
                id: `${bestAns.ans.length + 1}`,
                userId: user.id,
                ans: inputValue,
                like: [],
                unlike: [],
            };
            
            const dataMove = {
                id: mainAnsId!,
                params: answer,
            };
            
            await postAnAns(dataMove);
            
        }
    }
  }

  return (
    <div>
      {ansData ? (
        <div className="ml-4">
          {bestAns ? (
            <div className="bg-dark-3 p-2 m-1 rounded-[7px] flex items-center justify-between">
              <p>Ans: {bestAns.ans}</p>
              <div className="flex gap-2 items-center justify-center">
                <span className="flex items-center justify-center gap-1">
                  <Image
                    src={liked ? "/icons/liked.svg" : "/icons/like.svg"}
                    alt="like"
                    height={20}
                    width={20}
                    className="cursor-pointer"
                    onClick={() => likeState(liked)}
                  />
                  <p>
                    {liked
                      ? userLiked
                        ? bestAns.like.length
                        : bestAns.like.length + 1
                      : userLiked
                      ? bestAns.like.length - 1
                      : bestAns.like.length}
                  </p>
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Image
                    src={unLiked ? "/icons/unliked.svg" : "/icons/unlike.svg"}
                    alt="unlike"
                    height={20}
                    width={20}
                    className="cursor-pointer"
                    onClick={() => unLikeState(unLiked)}
                  />
                  <p>
                    {unLiked
                      ? userUnLiked
                        ? bestAns.unlike.length
                        : bestAns.unlike.length + 1
                      : userUnLiked
                      ? bestAns.unlike.length - 1
                      : bestAns.unlike.length}
                  </p>
                </span>
              </div>
            </div>
          ) : (
            <div>No best answer available.</div>
          )}
        </div>
      ) : (
        <div>Be the first to answer</div>
      )}
      <div className="flex justify-center items-center gap-2">
        <Input
          placeholder="Answer Question"
          onChange={handleInputChange}
          value={inputValue}
          className="bg-dark-3 outline-none border-none w-[95%]"
        />
        <Button 
          disabled={!ansIsOk}
          className='bg-blue-500'
          onClick={() => addAnAns()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default AnswerPlatform;
