import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function DefaultButton(props) {

  let clickHandler = props.onClick;

  if (typeof props.onClick !== 'function') {
    clickHandler = function emptyHandler(id) {
      console.log(`Handler is not registered for ${id}`);
    }
  }

  function defaultHandler(event) {

    clickHandler(props.id, event);

  }

  return (
    <button type="button" id={props.id} className="default-button pure-button pure-button-primary" onClick={defaultHandler}>{props.label}</button>
  );
}

DefaultButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};


export default DefaultButton;