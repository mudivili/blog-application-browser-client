import React from 'react';
import { withRouter } from 'react-router-dom';

import TopBar from './top-bar';
import ContentHolder from './content-holder';

import './index.css';

function Root() {
  return (
    <div id="root-main">

      <div id="top-bar-container">
        <TopBar/>
      </div>
      <div id="content-holder-container">
        <ContentHolder />
      </div>

    </div>
  );
}

export default withRouter(Root);