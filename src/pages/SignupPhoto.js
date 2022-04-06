import DownloadIcon from "../componets/DownloadIcon";
import Footer from "../componets/Footer";
import insta from "../img/insta.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/Signup.module.css";
import { authSignup } from "../store/actions/handleAuth";
import { Link } from "react-router-dom";
import Loader from "../componets/Loader";




const SignupPhoto = () => {
  const [file, setFile] = useState(null);
  const uid = useSelector(state => state.authReducer.userID)
  const dispatch = useDispatch();
  const loading = useSelector(state => state.authReducer.loading);

  const handleUpload = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  const signupEmail = useSelector(state => state.authReducer.signupEmail);
  const signupPassword = useSelector(
    (state) => state.authReducer.signupPassword
  );
  const signupUserName = useSelector(
    (state) => state.authReducer.signupUserName
  );

  const uploadPhoto = (e) => {
    e.preventDefault();
    dispatch(authSignup(signupEmail, signupPassword, signupUserName, file));
  };



  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <img src={insta} className={styles.instaImg} alt="" />
          <form onSubmit={uploadPhoto} action="">
            {!uid ? <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}><input type="file" onChange={handleUpload} required="required" />
            <button onSubmit={uploadPhoto}>Upload</button></div> : null}
            {loading ? <Loader /> : null}
            {uid ? <Link to="/login">
              <button>Vai al Login</button>
            </Link> : null}
          </form>
        </div>
        <DownloadIcon />
      </div>
      <Footer />
    </div>
  );
};

export default SignupPhoto;
