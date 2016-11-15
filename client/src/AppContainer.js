import React, { PropTypes } from 'react';
import Nav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import LeftSideBar from './LeftSideBar.js';
import RightSideBar from './RightSideBar.js';
import RightSideBarContainer from './RightSideBarTest.js';

class AppContainer extends React.Component {

  constructor(props){
    super(props)
    this.socket = io('/Hack-Reactor-NameSpace');
  }

    // render(){
    //   return (
    //     <div>

    //       <div><Nav /></div>
          
    //       <table>
    //         <td><LeftSideBar theSocket={this.socket} /></td>
    //         <td><PrimaryChatroom theSocket={this.socket} /></td>
    //         <td><RightSideBar theSocket={this.socket} /></td>
    //       </table>

    //     </div>
    //   )
    // }

  render(){
      return (
        <div>

          <div><RightSideBarContainer /></div>
          

        </div>
      )
    }
}

export default AppContainer