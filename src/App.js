import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupPhoto from "./pages/SignupPhoto";
import ProfilePage from "./pages/ProfilePage";
import UsersProfilePage from "./pages/UsersProfilePage";
import { authCheck } from "./store/actions/handleAuth";
import { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import { useDispatch } from "react-redux";


function App() {
  const dispatch = useDispatch();
  
  useEffect( () => {
     dispatch(authCheck());
  }, []) 

  return (
    <div>
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<SignupPhoto />} path="/signup/uploadphoto" />
        <Route element={<ProfilePage />} path="/:id" />
        <Route element={<UsersProfilePage />} path="/user/:id" />
      </Routes>
    </div>
  );
}

export default App;
