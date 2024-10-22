"use client";
// import EditorPage from '@/components/AskQuestQuill';
import BlockLoader from '@/components/BlockLoader';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { postQuest } from '@/fetchApi';
import { QuestionType } from '@/types/global';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    ['code-block'],
    [
      { color: ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#008080'] },
      { background: ['#FFEB3B', '#E91E63', '#4CAF50', '#2196F3', '#FF9800', '#795548'] }
    ],
  ],
};

const formats = [
  'header', 'font', 'list', 'bullet',
  'bold', 'italic', 'underline', 'strike',
  'align', 'code-block', 'color', 'background',
];

const AskAQuest = () => {
  // const [editorContent, setEditorContent] = useState<string>('');
  const [blockLoader, setBlockLoader] = useState(false);
  const [content, setContent] = useState('');

  // Effect to dynamically load ReactQuill on client side
  const handleChange = (content: string) => {
    setContent(content);
  };

  const { user } = useUser();

  async function sendQuest() {
    if (user) {
      const setData: QuestionType = {
        asker: user?.id,
        answerId: uuidv4(),
        question: content
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
          <div className="bg-gray-100 text-black p-4 rounded-lg shadow-lg">
            {ReactQuill ? (
              <ReactQuill
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                theme="snow"
                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ask Your Question Here?"
              />
            ) : (
              <p>Loading editor...</p>
            )}
      </div>
        </div>
        <div></div>
      </div>
      <div className='flex items-center justify-center w-full'>
        <Button
          className='bg-blue-1' disabled={'editorContent'.length <= 5}
          onClick={() => sendQuest()}
        >
          Submit
        </Button>
      </div>
      {blockLoader && <BlockLoader/>}
    </div>
  );
}

export default AskAQuest;
