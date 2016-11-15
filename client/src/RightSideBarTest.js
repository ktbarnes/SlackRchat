import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from 'react-side-bar';

class RightSideBarContainer extends React.Component {

  constructor(props) {
    super(props);
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
    const { barOpened, duration, mode, side, size, topBarIncluded } = this.state;
    const navIconClassName = [ 'nav-icon' ];

    if (barOpened) {
      navIconClassName.push('open');
    }
    const bar = (<div className='side'>John Michelin is AMAZING</div>);
    const topBar = (<div className='topBar'>
      <div className='left'>
        <div
          className={navIconClassName.join(' ')}
          onClick={this.toggleBar.bind(this)}>
          <span/><span/><span/><span/>
        </div>
      </div>
      <div className='center'>SideBar</div>
    </div>);

    const sideBarProps = {
      bar: bar,
      mode: mode,
      opened: barOpened,
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      side: side,
      veilStyle: {
        opacity: 0.4
      }
    };

    return (
      <SideBar {...sideBarProps}>
        { topBar }
        <div className='main'>

          <section className='opened-option'>
            <div className='option-wrapper'>
              <input
                id='opened-option'
                onChange={this.toggleBar.bind(this)}
                type='checkbox'
                checked={barOpened} />
              <label htmlFor='opened-option'>Show Active Members</label>
            </div>
          </section>

        </div>
      </SideBar>
    );
  }
}

export default RightSideBarContainer;