import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface Props {
  setBody: React.Dispatch<React.SetStateAction<object[]>>
}

const ArticleBodyCreator: React.FC<Props> = ({ setBody }) => {
  const [editorState, setEditorState] = useState<any>()
  
  const editorStateChange = (editorState: any) => {
    setEditorState(editorState)
  }

  useEffect(() => {
    if(editorState !== undefined) {
      let content = convertToRaw(editorState.getCurrentContent())
      setBody(content.blocks)
      console.log(content.blocks)
    }
  }, [editorState])

  return (
    <div className='bg-white text-black'>
      <Editor
        editorState={editorState}
        onEditorStateChange={editorStateChange}
        toolbar={{options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'emoji', 'image', 'history']}}
      />
    </div>
  )
}

export default ArticleBodyCreator