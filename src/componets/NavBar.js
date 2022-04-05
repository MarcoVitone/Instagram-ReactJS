import styles from "../style/NavBar.module.css";
import insta from "../img/instanav.png";
import UploadPage from "./UploadPage";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHouse,
  faMagnifyingGlass,
  faGear,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPaperPlane,
  faSquarePlus,
  faHeart,
  faCompass,
  faUser,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { openElements } from "../store/actions/handlePost";
import { authlogout } from "../store/actions/handleAuth";


const NavBar = () => {
  const [clicked, setClicked] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const openElement = useSelector((state) => state.postReducer.openElement);
  const dispatch = useDispatch();
  const url = localStorage.getItem("photoURL");
  const uid = localStorage.getItem("userID");

  const changeInput = (e) => {
    e.preventDefault();
    !clicked ? setClicked(true) : setClicked(false);
  };

  const magnify = (
    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.magnify} />
  );
  const input = <input type="text" placeholder="Cerca" key="1" />;
  const goBack = (
    <FontAwesomeIcon
      icon={faCircleXmark}
      className={styles.return}
      onClick={changeInput}
      key="2"
    />
  );

  const createUpload = () => {
    dispatch(openElements());
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("userName");
    dispatch(authlogout());
  };

  const openDropdownMenu = () => {
    !openMenu ? setOpenMenu(true) : setOpenMenu(false);
  };

  const dropdownMenu = () => {
    return (
      <div className={styles.dropdownMenuContainer}>
        <ul className={styles.ul}>
          <Link to={`/${uid}`} id={styles.profile}>
            <li className={styles.menuElement}>
              <FontAwesomeIcon icon={faUser} className={styles.menuIcon} />
              Profilo
            </li>
          </Link>
          <li className={styles.menuElement}>
            <FontAwesomeIcon icon={faBookmark} className={styles.menuIcon} />
            Elementi salvati
          </li>
          <li className={styles.menuElement}>
            <FontAwesomeIcon icon={faGear} className={styles.menuIcon} />
            Impostazioni
          </li>
          <li className={styles.menuElement}>
            <FontAwesomeIcon icon={faRotate} className={styles.menuIcon} />
            Cambia account
          </li>
          <li className={styles.menuElement} role="button" onClick={logout}>
            Esci
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {openElement ? <UploadPage display="inherit" /> : null}
      <div className={styles.containerObj}>
        <div id={styles.image} className={styles.obj}>
          <Link to="/">
            <img src={insta} alt="" />
          </Link>
        </div>
        <div id={styles.search} className={styles.obj}>
          <div id={styles.button}>
            {clicked ? (
              <div className={styles.searchInput}>{[input, goBack]}</div>
            ) : (
              <span role="button" onClick={changeInput}>
                {magnify} Cerca
              </span>
            )}
          </div>
        </div>
        <div id={styles.menu} className={styles.obj}>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} id={styles.home} />
          </Link>
          <FontAwesomeIcon icon={faPaperPlane} />
          <FontAwesomeIcon
            icon={faSquarePlus}
            role="button"
            onClick={createUpload}
          />
          <FontAwesomeIcon icon={faCompass} />
          <FontAwesomeIcon icon={faHeart} />
          <div className={styles.dropdownMenu}>
            <img
              src={url}
              alt=""
              id={styles.page}
              role="button"
              onClick={openDropdownMenu}
            />
            {openMenu ? dropdownMenu() : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
