import axios from 'axios';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Dropdown from 'react-dropdown';
import { default as Fade } from 'react-fade';
import TopNav from './nav.js';
import { dispatch, connect } from 'react-redux';
import { setCurrentUser } from '../actions/CurrentUserActions';

let user = {
  labels: [],
  datasets: [{
      label: '# of Messages by User',
      data: [],
      backgroundColor: 'rgba(41, 41, 157, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
  }],

}

let channel = {
  labels: [],
  datasets: [{
      label: '# of Messages by Channel',
      data: [],
      backgroundColor: 'rgba(41, 41, 157, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
  }]
}

const options = ['user','channel']

const these = {
  scales: {
    yAxes: [{
        ticks: {
          min: 0,
          beginAtZero: true
        }
    }]
  }
}

class Analytics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectValue: 'user',
      data: {
        labels: ['label'],
        datasets: [{
            label: '# of Messages',
            data: [1],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
      }
    }
  }

  componentWillMount() {
    const props = this.props;
    let users = {};
    let channels = {};
    axios.get('/db/lastweek', { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}})
    .then(resp => {
      resp.data.forEach(msg => {
        channels[msg.channelName] = channels[msg.channelName] ? channels[msg.channelName] + 1 : 1;
        users[msg.username] = users[msg.username] ? users[msg.username] + 1 : 1; 
      });
      user.labels = Object.keys(users);
      user.datasets[0].data = Object.values(users);
      this.setState({data: user})
      channel.labels = Object.keys(channels);
      channel.datasets[0].data = Object.values(channels);
    })
    .catch(error =>  props.router.replace('/'));
  }

  onSelect(updatedValue) {
    if(this.state.selectValue === 'user') this.setState({selectValue: updatedValue.value});
    else if (this.state.selectValue === 'channel') this.setState({selectValue: updatedValue.value});
  }

  componentDidUpdate() {
    if(this.state.selectValue === 'user') this.setState({data: user})
    else if(this.state.selectValue === 'channel') this.setState({data: channel})
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.data.datasets[0].label !== this.state.data.datasets[0].label) return true;
    if(nextState.selectValue !== this.state.selectValue) return true;
    return false;
  }

  render() {
    return (
      <Fade duration={.2}>
        <TopNav />
        <div className='bar-analytics'>
          <h4 className='dropdown-title'>View Number of Messages from Past Seven Days</h4>
          <div className='dropdown-analytics'>
            <h4>Select Option</h4>
            <Dropdown 
              options={options} 
              onChange={(value)=>this.onSelect(value)} 
              value={this.state.selectValue} 
              placeholder='Select an option...'
            />
          </div>
          <br />   
          <Bar 
            data={this.state.data}
            options={these}
          />
        </div>
      </Fade>

    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
  }
};

export default connect(mapStateToProps)(Analytics);