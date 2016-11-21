import React, { PropTypes } from 'react';
import RightSideBarEntryUser from './RightSideBarEntry-Users';
import { connect } from 'react-redux';
import {OtherUserProfile} from './OtherUserProfile'

const RightSideBar = ( {allUsers, currentUser, theSocket} ) => {

  const clickMe = () => {
    console.log("theSocket in RightSiderBar.js",theSocket)
  }
  return (
    <div>
      <p onClick={ () => clickMe()}>Click me</p>
      <div>
        USERS
        <ul id="room">
          {allUsers.map(user =>
            <RightSideBarEntryUser
              theSocket={theSocket}
              key={user.id}
              user={user}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  // console.log("all users",state.allReducers.UserReducer)
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    allUsers: state.allReducers.UserReducer 
  }
};

export default connect(mapStateToProps)(RightSideBar);