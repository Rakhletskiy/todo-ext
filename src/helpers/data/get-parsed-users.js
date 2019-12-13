export const getParsedUsers = () => {
  const users = localStorage.getItem('users');
  return JSON.parse(users);
};