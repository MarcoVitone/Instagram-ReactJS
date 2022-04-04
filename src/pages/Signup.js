import styles from "../style/Signup.module.css";
import insta from "../img/insta.png";
import Divider from "../componets/Divider";
import DownloadIcon from "../componets/DownloadIcon";
import Footer from "../componets/Footer";
import ErrorMessage from "../componets/ErrorMessage";
import { Link } from "react-router-dom";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signupData } from "../store/actions/handleAuth";
import { auth } from "../firebase-config";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUserName, setSignupUserName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState({});
  const error = useSelector((state) => state.authReducer.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const facebookError = () => {
    setClicked(true);
  };

  const signUp = async (e) => {
    e.preventDefault();
    dispatch(signupData(signupEmail, signupPassword, signupUserName));
    navigate("/signup/uploadphoto");
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <img src={insta} className={styles.instaImg} alt="" />
          <p>Iscriviti per vedere le foto e i video dei tuoi amici.</p>
          <div className={styles.facebook}>
            <button onClick={facebookError}>Accedi con Facebook</button>
            {clicked ? (
              <ErrorMessage message="Ci sono problemi di collegamento al server..." />
            ) : null}
          </div>
          <Divider />
          <form onSubmit={signUp} action="">
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => {
                setSignupEmail(e.target.value);
                e.preventDefault();
              }}
              required="required"
            />
            <input
              type="text"
              placeholder="Nome utente"
              onChange={(e) => {
                setSignupUserName(e.target.value);
                e.preventDefault();
              }}
              required="required"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setSignupPassword(e.target.value);
                e.preventDefault();
              }}
              required="required"
            />
            {error ? (
              <ErrorMessage
                message={"Ci sono problemi di Network...riprova più tardi!"}
              />
            ) : null}

              <button onClick={signUp}>Avanti</button>
          </form>
          <div className={styles.condition}>
            <p>
              Iscrivendoti, accetti le nostre{" "}
              <a href="https://help.instagram.com/581066165581870">
                Condizioni
              </a>
              . Scopri in che modo raccogliamo, usiamo e condividiamo i tuoi
              dati nella nostra{" "}
              <a href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0">
                Normativa sui dati
              </a>{" "}
              e in che modo usiamo cookie e tecnologie simili nella nostra{" "}
              <a href="https://help.instagram.com/1896641480634370?ref=ig">
                Normativa sui cookie.
              </a>
            </p>
          </div>
        </div>
        <div className={styles.signupContainer}>
          <h4>
            Hai un account? <Link to="/login">Accedi</Link>{" "}
          </h4>
        </div>
        <DownloadIcon />
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
