const initialState = {
  users: null,
  isAuth: false,
  currentUser: null
};

export default function auth (state = initialState, action) {
  switch(action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        users: action.users
      }
    case 'REG_NEW_USER':
      return {
        ...state,
        users: action.users
      }
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload,
        isAuth: action.isAuth
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        isAuth: action.payload
      }
    default:
      return state;
  }
}
