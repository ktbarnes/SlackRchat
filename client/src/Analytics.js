import axios from 'axios';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Dropdown from 'react-dropdown';

let data = {
  labels: [],
  datasets: [{
      label: '# of Messages by User',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
  }]
}

let data_channel = {
  labels: [],
  datasets: [{
      label: '# of Messages by Channel',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
  }]
}

export default class Analytics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
    let users = {};
    let channel = {};
    axios.get('/db/lastweek',{ headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}})
    .then(resp => {
      console.log('here are the messages ', resp.data)
      resp.data.forEach(msg => {
        channel[msg.channelName] = channel[msg.channelName] ? channel[msg.channelName] + 1 : 1;
        users[msg.username] = users[msg.username] ? users[msg.username] + 1 : 1; 
      });
      console.log('here are all of the users in user object ', users)
      data.labels = Object.keys(users);
      // data.datasets.backgroundColor = data.labels.map(user => 'rgba(255,99,132,1)');
      data.datasets.backgroundColor = 'rgba(255,99,132,1)';
      data.datasets[0].data = Object.values(users);
      console.log('here is the data man ', data);
      this.setState({data: data})
    })
  }

  onSelect() {

  }

  render() {
    console.log('rerender....',this.state.data)
    return (

      <div>
        <Bar 
          data={this.state.data}
        />
      </div>


    )
  }

}