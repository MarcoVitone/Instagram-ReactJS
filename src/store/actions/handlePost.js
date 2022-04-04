import { storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { users } from "../../Axios";
import { async } from "@firebase/util";

const UPLOAD_POST_START = "UPLOAD_POST_START";
const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS";
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
const FETCH_POSTS_DATA_START = "FETCH_POST_DATA_START";
const FETCH_USER_DATA_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const USER_PROFILE_DATA = "USER_PROFILE_DATA";
const OPEN_ELEMENT = "OPEN_ELEMENT";
const CLOSE_ELEMENT = "CLOSE_ELEMENT";
const OPEN_POST_SLIDER = "OPEN_POST_SLIDER";
const CLOSE_POST_SLIDER = "OPEN_POST_SLIDER";
const OPEN_STORIES = "OPEN_STORIES";
const CLOSE_STORIES = "CLOSE_STORIES";

export const createPost = (file, caption, url) => {
  return async (dispatch) => {
    dispatch(uploadPostStart());
    const userName = localStorage.getItem("userName");
    const uid = localStorage.getItem("userID");
    try {
      if (!file) return;
      //upload photo
      const storageRef = await ref(storage, `/${uid}/posts/${file.name}`);
      const uploadTask = await uploadBytes(storageRef, file);
      //get url profile photo
      const photoURL = await getDownloadURL(storageRef);
      //upload info's post
      const response = await users.post(`/${uid}/posts.json`, {
        userID: uid,
        userName: userName,
        photoURL: photoURL,
        profileURL: url,
        caption: caption,
      });
      dispatch(uploadPostSuccess());
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

export const fetchUsersData = (uid) => {
  return async (dispatch) => {
    dispatch(fetchPostsDataStart());
    try {
      //get user info
      const response = await users.get(".json");
      const myData = response?.data;
      const data = Object.keys(myData).map((key) => myData[key]);
      //iterate arrays to have one array of object of post
      const posts = data.map((item) => {
        return item.posts;
      });
      //filter array to delite undef value
      const filteredPosts = posts.filter(function (x) {
        return x !== undefined;
      });
      let postslList = [];
      for (let elements of filteredPosts?.values()) {
        Object.values(elements).map((singlePost) => {
          return postslList.push(singlePost);
        });
      }

      //create a random array of posts
      let random = [];
      postslList.map((map) => {
        return random.push(postslList[Math.floor(Math.random() * postslList.length)]);
      });

      const randomPostsList = random.filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
      });

      //iterate arrays to have one array of object of user
      const user = data.map((item) => {
        return item.userinfo;
      });
      let userList = [];
      for (let elements of user.values()) {
        Object.values(elements).map((singleUser) => {
          return userList.push(singleUser);
        });
      }

      // create posts list for user profile
      const myDataProfile = response?.data;
      const dataProfile = {};
      dataProfile[uid] = myDataProfile[uid];
      let profilePostsList
      if (dataProfile[uid].posts){
        const dataProfilePosts = dataProfile[uid].posts;
        profilePostsList = Object.values(dataProfilePosts);
      } 

      dispatch(
        fetchPostsDataSuccess(postslList, profilePostsList, randomPostsList)
      );
      dispatch(fetchUserDataSuccess(userList));
    } catch (error) {
      console.log(error)
      dispatch(fetchError(error));
    }
  };
};

export const usersProfile = (uid) => {
  return async dispatch => {
    try {
      const response = await users.get(".json");
      const userDataProfile = response?.data;
      const dataProfile = {};
      dataProfile[uid] = userDataProfile[uid];
      let userProfilePostsList;
      if (dataProfile[uid].posts) {
        const dataProfilePosts = dataProfile[uid].posts;
        userProfilePostsList = Object.values(dataProfilePosts);
      }
      dispatch(userProfileData(userProfilePostsList));
    } catch (error) {
      dispatch(fetchError(error))
    }
  }
}

export const uploadPostStart = () => {
  return {
    type: UPLOAD_POST_START,
  };
};

export const uploadPostSuccess = () => {
  return {
    type: UPLOAD_POST_SUCCESS,
  };
};

export const fetchPostsDataSuccess = (
  postsList,
  profilePostsList,
  randomPostsList
) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    postsList: postsList,
    profilePostsList: profilePostsList,
    randomPostsList: randomPostsList,
  };
};

export const fetchPostsDataStart = () => {
  return {
    type: FETCH_POSTS_DATA_START,
  };
};

export const fetchUserDataSuccess = (userList) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    userList: userList,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    error: error,
  };
};

export const userProfileData = (userProfilePostsList) => {
  return {
    type: USER_PROFILE_DATA,
    userProfilePostsList: userProfilePostsList,
  };
};

export const openElements = () => {
  return {
    type: OPEN_ELEMENT,
    openElement: true,
  };
};

export const closeElement = () => {
  return {
    type: CLOSE_ELEMENT,
    openElement: false,
  };
};

export const openPostSlider = () => {
  return {
    type: OPEN_POST_SLIDER,
    openSlider: true,
  };
};

export const closePostSlider = () => {
  return {
    type: CLOSE_POST_SLIDER,
    openSlider: false,
  };
};

export const openStories = (storyIndex) => {
  return {
    type: OPEN_STORIES,
    openStories: true,
    storyIndex: storyIndex,
  };
};

export const closeStories = () => {
  return {
    type: CLOSE_STORIES,
    openStories: false,
  };
};

export {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_DATA_START,
  FETCH_USER_DATA_SUCCESS,
  OPEN_ELEMENT,
  CLOSE_ELEMENT,
  OPEN_POST_SLIDER,
  CLOSE_POST_SLIDER,
  OPEN_STORIES,
  CLOSE_STORIES,
  UPLOAD_POST_START,
  UPLOAD_POST_SUCCESS,
  FETCH_ERROR,
  USER_PROFILE_DATA,
};
