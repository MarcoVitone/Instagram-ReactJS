import { auth, storage } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { users } from "../../Axios";

const SIGNUP_DATA = "SIGNUP_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS";
const AUTH_UPLOADPHOTO_SUCCESS = "AUTH_UPLOADPHOTO_SUCCESS";
const AUTH_FAIL = "AUTH_FAIL";
const LOGOUT = "LOGOUT";
const AUTH_CHECKING = "AUTH_CHECKING";

export const signupData = (signupEmail, signupPassword, signupUserName) => {
  return {
    type: SIGNUP_DATA,
    signupEmail: signupEmail,
    signupPassword: signupPassword,
    signupUserName: signupUserName,
  };
    

};

export const authLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authSuccess(user.user));
      localStorage.setItem("userID", user.user.uid);
      localStorage.setItem("token", user.user.accessToken);
      localStorage.setItem("photoURL", user.user.photoURL);
      localStorage.setItem("userName", user.user.displayName);
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const authSignup = (signupEmail, signupPassword, signupUserName, file) => {
  return async (dispatch) => {
    try {
      //create account
      const user = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      //update account name
      updateProfile(auth.currentUser, {
        displayName: signupUserName,
      });

      // onAuthStateChanged(auth, (currentUser) => {
      //   setUser(currentUser);
      // });

      const userID = auth.currentUser.uid

      if (!file && !userID) return;
      //upload profile photo
      const storageRef = await ref(
        storage,
        `/${userID}/profilephoto/${file.name}`
      );
      const uploadTask = await uploadBytes(storageRef, file);
      //get url profile photo
      const photoURL = await getDownloadURL(storageRef);
      updateProfile(auth.currentUser, { photoURL: photoURL });
      dispatch(authUploadPhotoSuccess(photoURL));
      dispatch(userDatabase(auth.currentUser, photoURL));

      dispatch(authSignupSuccess(user.user));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const authPhoto = (file, user) => {
  return async (dispatch) => {
    try {
      if (!file && !user) return;
      //upload profile photo
      const storageRef = await ref(
        storage,
        `/${user.uid}/profilephoto/${file.name}`
      );
      const uploadTask = await uploadBytes(storageRef, file);
      //get url profile photo
      const photoURL = await getDownloadURL(storageRef);
      updateProfile(auth.currentUser, { photoURL: photoURL });
      dispatch(authUploadPhotoSuccess(photoURL));
      dispatch(userDatabase(auth.currentUser, photoURL))
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const userDatabase = (user, photoURL) => {
  return async dispatch => {
    try {
      const response = await users.post(`/${user.uid}/userinfo.json`, {
        userID: user.uid,
        userName: user.displayName,
        photoURL: photoURL,
      });
    } catch (error) {
      dispatch(authFail(error));
    }
  }
}


export const authlogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("photoURL");
  return {
    type: LOGOUT,
  }
}

export const authSuccess = (userData) => {
  return {
    type: AUTH_SUCCESS,
    username: userData.displayName,
    userID: userData.uid,
    token: userData.accessToken,
    photoURL: userData.photoURL,
  };
};

export const authSignupSuccess = (userData) => {
  return {
    type: AUTH_SIGNUP_SUCCESS,
    userID: userData.uid,
  };
};

export const authUploadPhotoSuccess = (url) => {
  return {
    type: AUTH_UPLOADPHOTO_SUCCESS,
    photoURL: url,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};


export const authCheck = () => {
  return async dispatch => {
    const token = localStorage.getItem("token");
    if(!token) {
      return;
    }
    const userid = localStorage.getItem("userID"); 
    dispatch(authChecking(token, userid))
  }
}

export const authChecking = (token, userid) => {
  return {
    type: AUTH_CHECKING,
    token: token,
    userID: userid,
  }
}

export {
  SIGNUP_DATA,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_SIGNUP_SUCCESS,
  AUTH_UPLOADPHOTO_SUCCESS,
  LOGOUT,
  AUTH_CHECKING,
};
