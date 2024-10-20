import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    ], // Custom color palette
  ],
};

const formats = [
  'header', 'font', 'list', 'bullet',
  'bold', 'italic', 'underline', 'strike',
  'align', 'code-block', 'color', 'background', // Include color and background
];

interface EditorProps {
  setEditorContent: (content: string) => void;
}

const EditorPage: React.FC<EditorProps> = ({ setEditorContent }) => {
  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div className="bg-[#f9fafb] text-black p-4 rounded-lg shadow-lg">
      <ReactQuill
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Ask Your Question Here?"
      />
    </div>
  );
};

export default EditorPage;
