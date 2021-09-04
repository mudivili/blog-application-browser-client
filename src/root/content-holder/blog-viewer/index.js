import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Spinner from 'generics/spinner';
import serverInterface from 'server-interface';

import './index.css';

function BlogViewer(props) {

  const location = useLocation();

  const [blogLoaded, setBlogLoaded] = useState(false);
  const [blog, setBlog] = useState(null);

  useEffect(function initialize() {
    loadBlog();
  });

  async function loadBlog() {

    const blogId = location.pathname.split('/').pop();

    const _blog = await serverInterface.getBlogById(blogId);

    setBlog(_blog);
    setBlogLoaded(true);

  }

  function renderLoadingIndicator() {

    if (blogLoaded === true) {
      return;
    }

    return <Spinner/>;

  }

  function renderBlog() {

    if (blogLoaded === false) {
      return;
    }

    return (

      <div id="blog-display">

        <h2>{blog.title}</h2>

        <div dangerouslySetInnerHTML={{__html: blog.content}} />


      </div>

    );

  }

  return (

    <div id="blog-viewer">

      {renderLoadingIndicator()}

      {renderBlog()}

    </div>

  );
}

export default BlogViewer;