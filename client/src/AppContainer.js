import React, { PropTypes } from 'react';
import Nav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import SideBar from './sidebar.js';

class AppContainer extends React.Component {

  render(){
    return (
      <div>

        <div><Nav /></div>
        
        <div>
          <div><SideBar /></div>
          <div><PrimaryChatroom /></div>
        </div>

      </div>
    )
  }
}

export default AppContainer