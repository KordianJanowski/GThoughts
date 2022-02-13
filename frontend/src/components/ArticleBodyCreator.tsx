import React, { useState, useEffect } from 'react';
import { IarticleBody } from '../models/models'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { LOCALES } from '../i18n';

interface Props {
  setBody?: React.Dispatch<React.SetStateAction<IarticleBody | undefined>>;
  body?: IarticleBody;
}

const defaultProps: Props = {
  body: {
    blocks: [],
    html: ''
  }
}

const ArticleBodyCreator: React.FC<Props> = ({ body, setBody }) => {
  const [editorState, setEditorState] = useState<any>()
  const isI18NisEnglish: boolean = localStorage.getItem('i18n') === LOCALES.ENGLISH;

  useEffect(() => {
    if(editorState !== undefined) {
      let filteredEditorState = convertToRaw(editorState.getCurrentContent())
      filteredEditorState.blocks = filteredEditorState.blocks.filter(el => el.text.trim() !== '')

      let htmlString = draftToHtml(filteredEditorState).replace(/\n/ig, '<br>')

      let blocksArray:string[] = []
      filteredEditorState.blocks.forEach(block => {
        blocksArray.push(block.text)
      })

      let data:IarticleBody = {
        html: htmlString,
        blocks: blocksArray
      }

      setBody!(data)
    }// eslint-disable-next-line
  }, [editorState])

  useEffect(() => {
    if(body?.blocks !== [] && body?.html !== '') {
      const html:string = body?.html.replace(/<br>/ig, '\n')!
      const blocks = htmlToDraft(html);
      const { contentBlocks, entityMap } = blocks;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }// eslint-disable-next-line
  }, [])

  return (
    <div className='text-white border border-gray-700 rounded-md my-2 container text-2xl'>
      <Editor
        editorState={editorState}
        onEditorStateChange={(newState) => setEditorState(newState)}
        wrapperClassName="wrapperStyles"
        editorClassName="editorStyles"
        localization={{
          locale: `${isI18NisEnglish ? 'en': 'pl'}`,
        }}
        placeholder={`${isI18NisEnglish ? 'Write your article here' : 'Tutaj napisz swój artykuł'}`}
      />
    </div>
  )
}

ArticleBodyCreator.defaultProps = defaultProps;

export default ArticleBodyCreator