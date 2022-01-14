import React, { useState, useEffect } from 'react';
import { IarticleBody } from '../models/models'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface Props {
  setBody?: React.Dispatch<React.SetStateAction<IarticleBody | undefined>>
  body?: IarticleBody
}

const defaultProps: Props = {
  body: {
    blocks: [],
    html: ''
  }
}

const ArticleBodyCreator: React.FC<Props> = ({ body, setBody }) => {
  const [editorState, setEditorState] = useState<any>()

  useEffect(() => {
    if(editorState !== undefined) {
      let blocksArray:string[] = []
      convertToRaw(editorState.getCurrentContent()).blocks.forEach(block => {
        blocksArray.push(block.text)
      })

      let htmlString = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      htmlString = htmlString.replace(/\n/ig, '<br>')

      let data:IarticleBody = {
        html: htmlString,
        blocks: blocksArray
      }

      setBody!(data)
    }
  }, [editorState])

  useEffect(() => {
    if(body?.blocks !== [] && body?.html !== '') {
      const html:string = body?.html.replace(/<br>/ig, '\n')!
      const blocks = htmlToDraft(html);
      const { contentBlocks, entityMap } = blocks;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [])

  const editorStateChange = (editorState: any) => {
    setEditorState(editorState)
  }

  return (
    <div className='text-white border border-gray-700 rounded-md my-2 container'>
      <Editor
        editorState={editorState}
        onEditorStateChange={editorStateChange}
        toolbar={{options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'emoji', 'colorPicker', 'image', 'history']}}
        localization={{
          locale: 'pl',
        }}
        placeholder='Tutaj napisz swój artykuł'
      />
    </div>
  )
}

ArticleBodyCreator.defaultProps = defaultProps;

export default ArticleBodyCreator