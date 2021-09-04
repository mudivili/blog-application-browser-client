import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BlogReadMoreButton from '../buttons/blog-read-more'

import './index.css';

// <BlogRow {...blog} />

function BlogRow(props) {

  const readMoreButtonProps = {
    blogId: props.id,
    onClick: props.rowClickHandler
  };

  return (
    <div id={"blog-row-" + props._id} className="blog-row pure-u-1">

      <Link to={"/blogs/" + props.id}><h4 className="blog-title">{props.title}</h4></Link>

      <div className="content" dangerouslySetInnerHTML={{__html: props.content}} />

      <BlogReadMoreButton {...readMoreButtonProps} />

    </div>
  );
}

BlogRow.propTypes = {
  id: PropTypes.string.isRequired
};


export default BlogRow;
