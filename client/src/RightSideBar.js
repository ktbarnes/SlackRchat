import React, { PropTypes } from 'react';
import RightSideBarEntryUser from './RightSideBarEntry-Users';
import { connect } from 'react-redux';
import OtherUserProfile from './OtherUserProfile';
import { Nav } from 'react-bootstrap';

/*
Note to reader:
This is the right sidebar that is pulled into AppContainer. It is the component that appears
when the "Show Users" checkbox is clicked

Note that theSocket is a prop that is passed in explicitly from AppContainer

This component maps through the allUsers UserReducer and creates each component for the users called
RightSideBarEntryUser. 

This component also has a link to other users's profiles
*/

const RightSideBar = ( {allUsers, currentUser, theSocket, clickedUser} ) => {

  return (
    <div>
      <div>
        <div style={ {height: 185} }></div>
        <div className="RSBTitle">
          <h4>All Users</h4>
        </div>
        <ul>
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
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer 
  }
};

export default connect(mapStateToProps)(RightSideBar);