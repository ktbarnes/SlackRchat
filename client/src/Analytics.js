import axios from 'axios';
import React from 'react';
import { Bar } from 'react-chartjs-2';
// import Data from './Data'
import Dropdown from 'react-dropdown'

let data = {
  labels: [],
  datasets: [{
      label: '# of Messages',
      data: [],
      backgroundColor: 
          // 'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
      //     'rgba(255, 206, 86, 0.2)',
      //     'rgba(75, 192, 192, 0.2)',
      //     'rgba(153, 102, 255, 0.2)',
      //     'rgba(255, 159, 64, 0.2)'
      // ],
      borderColor: 
          // 'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
      //     'rgba(255, 206, 86, 1)',
      //     'rgba(75, 192, 192, 1)',
      //     'rgba(153, 102, 255, 1)',
      //     'rgba(255, 159, 64, 1)'
      // ],
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
    // let data = {};
    axios.get('/db/lastweek',{ headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}})
    .then(resp => {
      console.log('here are the messages ', resp.data)
      resp.data.forEach(msg => {
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