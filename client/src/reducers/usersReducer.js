const initialState = {
    isAuthenticated: false,
    currentUser: {},
    errors:''
  };
  
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNIN_USER':
      return {...state, 
        isAuthenticated: !!(Object.keys(action.payload).length),
        currentUser: action.payload,
        errors: ''
  
      }
    case 'SIGNOUT_USER':
      return {...state, 
        isAuthenticated: false,
        currentUser: {},
        errors: '' }
    case 'SIGNIN_FAIL':
      return {...state, 
        isAuthenticated: false,
        currentUser: {},
        errors: action.payload
      }
    default:
      return state;
    }
}