import styles from "../style/Login.module.css";
import image from "../img/immagine.png";
import bG1 from "../img/sfondo.png";
import bG2 from "../img/sfondo2.png";
import bG3 from "../img/sfondo3.png";
import bG4 from "../img/sfondo4.png";
import insta from "../img/insta.png";
import DownloadIcon from "../componets/DownloadIcon";
import Footer from "../componets/Footer";
import ErrorMessage from "../componets/ErrorMessage";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authLogin } from "../store/actions/handleAuth";
import { Navigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const error = useSelector((state) => state.authReducer.error);


  const images = [bG1, bG2, bG3, bG4];
  setTimeout(() => {
    if (current === images.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }, 3000);

  const renderImage = () => {
    return images.map((value, index) => {
      if (index === current)
        return (
          <img
            src={value}
            key={index}
            alt=""
            style={{ transition: "1.5s ease-in" }}
          />
        );
    });
  };

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(authLogin(email, password));
  };

  let shouldRedirect = null;
  if (token) {
    shouldRedirect = <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      {shouldRedirect}
      <div className={styles.mainContainer}>
        <div className={styles.imgContainer}>
          <img src={image} alt="" />
          <div className={styles.imagages}>{renderImage()}</div>
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.formContainer}>
            <img src={insta} className={styles.instaImg} alt="" />
            <form onSubmit={login} action="">
              <input
                type="email"
                placeholder="Inserisci la tua mail"
                onChange={handleEmail}
                required="required"
              />
              <input
                type="password"
                placeholder="Inserisci la tua password"
                onChange={handlePassword}
                required="required"
              />
              {error ? (
                <ErrorMessage message={"Nome utente o Password errati"} />
              ) : null}
              <button onClick={login}>Accedi</button>
            </form>
            <div className={styles.divider}>
              <div className={styles.lineBreak}></div>
              <div className={styles.o}>o</div>
              <div className={styles.lineBreak}></div>
            </div>
            <div className={styles.facebook}>
              <h4>Accedi con Facebook</h4>
            </div>
            <div>
              <h6>Hai dimenticato la password?</h6>
            </div>
          </div>
          <div className={styles.signupContainer}>
            <h4>
              Non hai un account? <Link to="/signup">Iscriviti</Link>{" "}
            </h4>
          </div>
          <DownloadIcon />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
