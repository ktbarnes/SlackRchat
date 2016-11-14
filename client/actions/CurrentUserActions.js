export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    id: user.id,
    username: user.username,
    email: user.email,
    currentUserToggle: user.currentUserToggle
  };
};