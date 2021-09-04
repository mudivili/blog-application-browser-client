import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';

import DefaultButton from 'generics/buttons/default';

import './index.css';

function TopBar() {

  const location = useLocation();
  const history = useHistory();

  function navigate() {

    if(location.pathname !== '/') {
      history.push('/');
    }
    else {
      history.push('/blogs/create');
    }

  }

  function renderButton() {

    let label = 'POST';

    if(location.pathname !== '/') {
      label = 'BACK';
    }

    const defaultButtonProps = {
      id: 'top-bar-navigation-button',
      label: label,
      onClick(id, event) {
        navigate();
      }
    };

    return <DefaultButton {...defaultButtonProps} />;

  }

  return (
    <div id="top-bar">

      <div className="left-section">
        <Link to="/"><span className="application-title">Blog</span></Link>
      </div>

      <div className="right-section">
        {renderButton()}
      </div>

    </div>
  );

}

export default TopBar;