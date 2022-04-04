import * as actionTypes from "../actions/handleAuth";


const initialState = {
    signupEmail: "",
    signupPassword: "",
    signupUserName: "",
    username: null,
    userID: null,
    token: null,
    photoURL: null,
    error: false,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_DATA:
            return {
              signupEmail: action.signupEmail,
              signupPassword: action.signupPassword,
              signupUserName: action.signupUserName,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
              ...state,
              username: action.username,
              userID: action.userID,
              token: action.token,
              photoURL: action.photoURL,
            };
        case actionTypes.AUTH_SIGNUP_SUCCESS:
            return {
              ...state,
              username: action.username,
              userID: action.userID,
              token: action.token,
            };
        case actionTypes.AUTH_UPLOADPHOTO_SUCCESS:
            return{
                ...state,
                photoURL: action.photoURL,
            }
        case actionTypes.AUTH_FAIL:
            return {
              ...state,
              error: true,
              loading: false,
            };   
        case actionTypes.LOGOUT:
            return {
              ...state,
              token: null,
              userID: null,
            };
        case actionTypes.AUTH_CHECKING:
            return{
                ...state,
                token: action.token,
                userID: action.userID,
            }
        default:
            return state;
    }
}

export default loginReducer;