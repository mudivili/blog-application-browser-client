import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function BlogReadMoreButton(props) {

  let clickHandler = props.onClick;

  if (typeof props.onClick !== 'function') {
    clickHandler = function emptyHandler(blogId) {
      console.log(`Handler is not registered for ${blogId}`);
    }
  }

  function defaultHandler() {

    clickHandler(props.blogId);

  }

  return (
    <button id={"blog-" + props.blogId + "-read-more"} className="blog-read-more-button pure-button-secondary pure-button" onClick={defaultHandler}>READ MORE</button>
  );
}

BlogReadMoreButton.propTypes = {
  blogId: PropTypes.string.isRequired
};


export default BlogReadMoreButton;