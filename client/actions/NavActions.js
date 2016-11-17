import { dispatch } from 'react-redux';

export const OPEN_PROFILE_REQUEST = 'OPEN_PROFILE_REQUEST'

export function open() {
  return {
    type: OPEN_PROFILE_REQUEST,
    showModel: true
  }
}