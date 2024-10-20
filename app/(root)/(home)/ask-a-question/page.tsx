"use client";
import EditorPage from '@/components/AskQuestQuill';
import BlockLoader from '@/components/BlockLoader';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { postQuest } from '@/fetchApi';
import { QuestionType } from '@/types/global';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const writeCode = " Write Code here ";
const page = () => {
  const [textAreaVal, setTextAreaVal] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>('');
  const [blockLoader, setBlockLoader] = useState(false);

  const { user } = useUser();

  async function sendQuest() {
    if (user) {
      const setData: QuestionType = {
        asker: user?.id,
        answerId: uuidv4(),
        question: editorContent
      };

      setBlockLoader(true)
      try {
        const postRes = await postQuest(setData);
        if(postRes){
          setBlockLoader(false)
            toast({title: 'Question posted'})
              setTimeout(() => {
                window.location.href = "/"
              }, 2000)
        }
      } catch (error) {
        setBlockLoader(false)
        toast({title: 'Failed to post Question.'})

      }
    }
  }

  return (
    <div className='text-white text-center'>
      <h1>Feel free to ask any question publicly and get answers from the community.</h1>
      <div className="flex flex-col items-start justify-center bg-dark-1 p-[2px] rounded-[5px] m-5">
        <div className={'bg-dark-2 w-full'}></div>
        <div className='p-2 w-full'>
          <EditorPage setEditorContent={setEditorContent} />
        </div>
        <div></div>
      </div>
      <div className='flex items-center justify-center w-full'>
        {textAreaVal}
        <Button
          className='bg-blue-1' disabled={editorContent.length <= 5}
          onClick={() => sendQuest()}
        >
          Submit
        </Button>
      </div>
      {blockLoader && <BlockLoader/>}
    </div>
  );
}

export default page;
