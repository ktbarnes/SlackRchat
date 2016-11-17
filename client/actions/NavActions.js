import { dispatch } from 'react-redux';

export const OPEN_PROFILE_REQUEST = 'OPEN_PROFILE_REQUEST'
export const CLOSE_PROFILE_REQUEST = 'CLOSE_PROFILE_REQUEST'

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

