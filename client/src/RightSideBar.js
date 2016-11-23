import React, { PropTypes } from 'react';
import RightSideBarEntryUser from './RightSideBarEntry-Users';
import { connect } from 'react-redux';
import OtherUserProfile from './OtherUserProfile'

const RightSideBar = ( {allUsers, currentUser, theSocket, clickedUser} ) => {

  return (
    <div>
      <div>
        <div style={ {height: 161.82} }></div>
        <h3>ALL USERS</h3>
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
      <div>
        <OtherUserProfile  />
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  // console.log("all users",state.allReducers.ClickedUserProfileReducer)
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer 
  }
};

export default connect(mapStateToProps)(RightSideBar);