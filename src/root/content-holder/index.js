import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import BlogsListing from 'root/content-holder/blogs-listing';
import BlogViewer from 'root/content-holder/blog-viewer';
import BlogEditor from 'root/content-holder/blog-editor';

import './index.css';

function ContentHolder() {

  return (
    <Switch>
        <Route path="/blogs/create">
          <BlogEditor />
        </Route>
        <Route path="/blogs/:blogId">
          <BlogViewer />
        </Route>
        <Route path="/">
          <BlogsListing />
        </Route>
      </Switch>
  );
}

export default ContentHolder;