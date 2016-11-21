import axios from 'axios'

export const CLICKED_USER_PROFILE_REQUEST = 'CLICKED_USER_PROFILE_REQUEST'
export const OPEN_PROFILE_REQUEST = 'OPEN_PROFILE_REQUEST'
export const CLOSE_PROFILE_REQUEST = 'CLOSE_PROFILE_REQUEST'

export function clickedUserProfile(user) {
	return {
	type: CLICKED_USER_PROFILE_REQUEST,
	id: user.id,
    username: user.username,
    email: user.email
	}
}

export const open = () => {
  return {
    type: OPEN_PROFILE_REQUEST,
    showModel: true
  }
}

export const close = () => {
  return {
    type: CLOSE_PROFILE_REQUEST,
    showModel: false
  }
}





