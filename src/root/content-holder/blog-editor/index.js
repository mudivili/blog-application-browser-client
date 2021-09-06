import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import DefaultButton from 'generics/buttons/default';
import SmallSpinner from 'generics/small-spinner';

import serverInterface from 'server-interface';

import './index.css';


function BlogEditor(props) {

  const history = useHistory();

  const [blog, setBlog] = useState({
    title: '',
    content: ''
  });
  const [storing, setStoring] = useState(false);

  const [errorStateMap, setErrorStateMap] = useState(getEmptyErrorStateMap());

  const titleInputProps = {
    className: 'blog-editor-form-input',
    placeholder: 'Enter blog title',
    onChange(event) {

      setBlog({
        ...blog,
        title: event.target.value
      });

    }
  };

  const ckeditorProps = {
    editor: ClassicEditor,
    config: {
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
      placeholder: 'Enter blog content'
    },
    data: blog.content,
    onReady(editor) {

    },
    onChange(event, editor) {
      const data = editor.getData();
      setBlog({
        ...blog,
        content: data
      });
    }
  }

  const postBlogButtonProps = {
    id: 'post-blog-button',
    label: 'Post',
    onClick(buttonId, event) {

      postBlog(blog);

    }
  };


  async function postBlog(blog) {

    try {
      setStoring(true);
      const payload = {
        title: blog.title,
        content: blog.content
      }
      if (blog.title === '') {
        delete payload.title;
      }
      if (blog.content === '') {
        delete payload.content;
      }

      await serverInterface.saveBlog(payload);

      clearErrors();
      gotoBlogListing();

    } catch (exception) {

      if (exception.name === 'ValidationError') {
        handleValidationErrors(exception.errors);
      } else {
        gotoBlogListing();
      }

    }

    setStoring(false);

  }

  function handleValidationErrors(errors) {

    let _errorStateMap = getEmptyErrorStateMap();

    for (let error of errors) {

      if (error.keyword === 'required') {

        const field = error.params.missingProperty;
        const errorState = _errorStateMap[field];

        errorState.status = true;
        errorState.message = 'Required';

      }
      if (error.keyword === 'minLength') {

        const field = error.instancePath.substring(1);
        const errorState = _errorStateMap[field];

        errorState.status = true;
        errorState.message = `Minimum ${error.params.limit} characters are required`;

      }

    }

    setErrorStateMap(_errorStateMap);

  }

  function clearErrors() {
    setErrorStateMap(getEmptyErrorStateMap());
  }

  function getEmptyErrorStateMap() {
    return {
      title: {
        status: false,
        message: null
      },
      content: {
        status: false,
        message: null
      }
    };
  }

  function gotoBlogListing() {
    history.push('/');
  }

  function renderTitleInputErrorLabel() {

    if (errorStateMap.title.status === false) {
      return;
    }

    const labelProperties = {
      className: "blog-editor-form-error-label pure-form-message"
    };

    return <label {...labelProperties}>{errorStateMap.title.message}</label>;

  }

  function renderContentInputErrorLabel() {

    if (errorStateMap.content.status === false) {
      return;
    }

    const labelProperties = {
      className: "blog-editor-form-error-label pure-form-message"
    };

    return <label {...labelProperties}>{errorStateMap.content.message}</label>;

  }

  function renderCKEditor() {

    return (<div className="ck-editor-container">
        <CKEditor {...ckeditorProps} />
    </div>);

  }

  function renderSpinner() {

    if (storing === false) {
      return;
    }

    return <SmallSpinner />;
  }

  return (

    <div id="blog-editor">

        <form id="blog-editor-form" className="pure-form">

          <div className="blog-editor-form-row">

            <input {...titleInputProps} />
            {renderTitleInputErrorLabel()}

          </div>

          <div className="blog-editor-form-row blog-editor-content-row">

            {renderCKEditor()}
            {renderContentInputErrorLabel()}

          </div>

          <div className="blog-editor-form-row post-button-row">

            <DefaultButton {...postBlogButtonProps} />
            {renderSpinner()}
          </div>

        </form>

      </div>

  );

}

export default BlogEditor;