import * as actionTypes from "../actions/handlePost";

const initialState = {
  postsList: [],
  userList: [],
  profilePostsList: [],
  randomPostsList:[],
  userProfilePostsList: [],
  storyIndex: "",
  openElement: false,
  openSlider: false,
  openStories: false,
  loading: false,
  error: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_POST_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.UPLOAD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        postsList: action.postsList,
        profilePostsList: action.profilePostsList,
        randomPostsList: action.randomPostsList,
        loading: false,
      };
    case actionTypes.FETCH_POSTS_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        userList: action.userList,
        loading: false,
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

      case actionTypes.CURRENT_USER_PROFILE_DATA:
        return {
          ...state,
          profilePostsList: action.profilePostsList,
        };
      case actionTypes.USER_PROFILE_DATA:
        return {
          ...state,
          userProfilePostsList: action.userProfilePostsList,
        };
    case actionTypes.OPEN_ELEMENT:
      return {
        ...state,
        openElement: action.openElement,
      };
    case actionTypes.CLOSE_ELEMENT:
      return {
        ...state,
        openElement: action.openElement,
      };
    case actionTypes.OPEN_POST_SLIDER:
      return {
        ...state,
        openSlider: action.openSlider,
      };
    case actionTypes.CLOSE_POST_SLIDER:
      return {
        ...state,
        openSlider: action.openSlider,
      };
    case actionTypes.OPEN_STORIES:
      return {
        ...state,
        storyIndex: action.storyIndex,
        openStories: action.openStories,
      };
    case actionTypes.CLOSE_STORIES:
      return {
        ...state,
        openStories: action.openStories,
        storyIndex: "",
      };
    default:
      return state;
  }
};

export default postReducer;