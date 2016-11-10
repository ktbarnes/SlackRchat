//sidebar component
//contains Rooms component
//Rooms component contains specific room component
import React from 'react';

const SideBar = ({}) => (
  	<div className="sideBar">
  	<h1>Rooms</h1>
     <ul>
     <li>Here we will list the Rooms</li>
     </ul>
    <h2>Direct Messages</h2> 
    <ul>
     <li>Here we will list the Direct Messages</li>
     </ul>
  	</div>	

);


export default SideBar

//under h1 should be a Rooms Component entry
	//<RoomsEntry rooms={this.state.rooms}/>
//under h2 should be a Direct Messages Component
	//<DMEntry dms={this.state.dms}/>
//we need to discuss state and where	