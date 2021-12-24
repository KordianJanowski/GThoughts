import React, { useState, useEffect } from 'react';
import { IarticleBody } from '../models/models'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

interface Props {
  setBody: React.Dispatch<React.SetStateAction<IarticleBody | undefined>>
}

const ArticleBodyCreator: React.FC<Props> = ({ setBody }) => {
  const [editorState, setEditorState] = useState<any>()
  
  const editorStateChange = (editorState: any) => {
    setEditorState(editorState)
  }

  useEffect(() => {
    if(editorState !== undefined) {

      let blocks:string[] = []
      convertToRaw(editorState.getCurrentContent()).blocks.forEach(block => {
        blocks.push(block.text)
      })

      let data:IarticleBody = {
        html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        blocks: blocks
      }

      setBody(data)
    }
  }, [editorState])

  return (
    <div className='bg-white text-black'>
      <Editor
        editorState={editorState}
        onEditorStateChange={editorStateChange}
        toolbar={{options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'emoji', 'image', 'history']}}
      />
      {
        editorState ?
          <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            className='w-full bg-red-300'
          />
        : 
          <p>zara bedzie</p>
      }
    </div>
  )
}

export default ArticleBodyCreator