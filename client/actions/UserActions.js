


export const addUser = (eachUser) => {
  return {
    type: 'ADD_USER',
    id: eachUser.id,
    username: eachUser.username,
    email: eachUser.email
  };
};