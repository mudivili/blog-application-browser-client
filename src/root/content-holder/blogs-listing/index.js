import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import BlogRow from 'generics/blog-row';
import Spinner from 'generics/spinner';

import serverInterface from 'server-interface';

import './index.css';

function BlogsListing(props) {

  const history = useHistory();

  const [blogsLoaded, setBlogsLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(function initialize() {
    loadBlogs();
  }, []);

  async function loadBlogs() {

    const _blogs = await serverInterface.getAllBlogs({
      sortOptions: {
        createdAt: -1
      }
    });

    setBlogs(_blogs);
    setBlogsLoaded(true);

  }

  function viewBlog(blogId) {
    history.push(`/blogs/${blogId}`);
  }

  function renderLoadingIndicator() {

    if (blogsLoaded === true) {
      return;
    }

    return <Spinner/>;

  }

  function renderBlog(blog) {

    return <BlogRow {...blog} id={blog._id} key={blog._id} rowClickHandler={viewBlog} />;

  }

  function renderBlogs() {

    if (blogsLoaded === false) {
      return;
    }

    let blogFragments = [];

    for (let blog of blogs) {

      blogFragments.push(renderBlog(blog));

    }

    return (<div id="blogs-list" className="pure-g">

        {blogFragments}

    </div>);

  }

  return (

    <div id="blogs-listing-main">

      {renderLoadingIndicator()}

      {renderBlogs()}

    </div>

  );
}

export default BlogsListing;