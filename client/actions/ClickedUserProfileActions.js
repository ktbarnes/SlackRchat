import axios from 'axios'

export const CLICKED_USER_PROFILE_REQUEST = 'CLICKED_USER_PROFILE_REQUEST'

export function clickedUserProfile(user) {
	return {
	type: CLICKED_USER_PROFILE_REQUEST,
	id: user.id,
    username: user.username,
    email: user.email,
	}
}





