const initialState = {
  users: null,
  isAuth: false,
  currentUser: null,
  isRegister: false
};

export default function auth (state = initialState, action) {
  switch(action.type) {
    case 'SET_IS_REGISTER':
      return {
        ...state,
        isRegister: action.isRegister
      }
    case 'FETCH_DATA':
      return {
        ...state,
        users: action.users
      }
    case 'REG_NEW_USER':
      return {
        ...state,
        users: action.users,
        isRegister: action.isRegister
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
