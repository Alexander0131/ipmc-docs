'use client'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Ensure styles are loaded correctly

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    ['code-block'],
    [
      { 'color': ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#008080'] },
      { 'background': ['#FFEB3B', '#E91E63', '#4CAF50', '#2196F3', '#FF9800', '#795548'] }
    ],
  ],
};

const formats = [
  'header', 'font', 'list', 'bullet',
  'bold', 'italic', 'underline', 'strike',
  'align', 'code-block', 'color', 'background',
];

interface EditorProps {
  setEditorContent: (content: string) => void;
}

const EditorPage: React.FC<EditorProps> = ({ setEditorContent }) => {
  const [content, setContent] = useState('');

  const handleChange = (content: string) => {
    setContent(content);
    setEditorContent(content);
  };

  return (
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
  );
};

export default EditorPage;
