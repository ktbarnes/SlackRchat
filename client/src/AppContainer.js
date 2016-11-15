import React, { PropTypes} from 'react';
import ReactDOM from 'react-dom';
import SideBar from '../lib/SideBar-modified.js';
import Nav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import LeftSideBar from './LeftSideBar.js';
import RightSideBar from './RightSideBar.js';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io('/Hack-Reactor-NameSpace');
    this.state = {
      barOpened: false,
      duration: 150,
      mode: 'over',
      side: 'right',
      size: 256,
      tolerance: 70
    }
  }

  toggleBar() { this.setState({ barOpened: !this.state.barOpened })}
  onOpen() { this.setState({ barOpened: true })}
  onClose() { this.setState({ barOpened: false })}

  render() {
    const { barOpened, duration, mode, side, size } = this.state;
    const navIconClassName = [ 'nav-icon' ];

    if (barOpened) { navIconClassName.push('open'); }

    const bar = (<div className='side'><RightSideBar theSocket={this.socket} /></div>);

    const sideBarProps = {
      bar: bar,
      mode: mode,
      opened: barOpened,
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      side: side
    };

    return (
      <SideBar {...sideBarProps}>
        <Nav />
        <div>

            <div onClick={this.toggleBar.bind(this)}>Show Active Members</div>
            <input
              onChange={this.toggleBar.bind(this)}
              type='checkbox'
              checked={barOpened} />


          <table>
            <td><LeftSideBar theSocket={this.socket} /></td>
            <td><PrimaryChatroom theSocket={this.socket} /></td>
          </table>          

        </div>
      </SideBar>
    );
  }
}

export default AppContainer;