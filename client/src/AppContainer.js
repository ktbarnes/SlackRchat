import React, { PropTypes } from 'react';
import Nav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import SideBar from './sidebar.js';

class AppContainer extends React.Component {

  constructor(props){
    super(props)
    this.socket = io('/Hack-Reactor-NameSpace');
  }

  render(){
    return (
      <div>

        <div><Nav /></div>
        
        <table>
          <td><SideBar theSocket={this.socket} /></td>
          <td><PrimaryChatroom theSocket={this.socket} /></td>
        </table>

      </div>
    )
  }
}

export default AppContainer