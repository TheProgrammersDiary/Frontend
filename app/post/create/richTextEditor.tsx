"use client"

import dynamic from 'next/dynamic';
import React, { useState, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ initialHtml, onEditorChange }) => {
  const [editorHtml, setEditorHtml] = useState(initialHtml);
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  const handleChange = (html) => {
    setEditorHtml(html);
    onEditorChange(html);
  };

  return (
    <>
      <ReactQuill style={{ height: "400px" }}
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
          ]
        }}
        formats={[
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image', 'video'
        ]}
      />
    </>
  );
};

export default RichTextEditor;