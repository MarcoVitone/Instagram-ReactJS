import NavBar from "../componets/NavBar";
import ProfilePosts from "../componets/ProfilePosts";
import Footer from "../componets/Footer";
import styles from "../style/ProfilePage.module.css";
import ErrorMessage from "../componets/ErrorMessage";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faBorderAll,
  faBookmark,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router";
import PostSlider from "../componets/PostSlider";
import { useDispatch } from "react-redux";
import { openPostSlider } from "../store/actions/handlePost";
import { useState } from "react";

const ProfilePage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const url = localStorage.getItem("photoURL");
  const uid = localStorage.getItem("userID");
  const userName = localStorage.getItem("userName");
  const profilePostsList = useSelector(
    (state) => state.postReducer.profilePostsList
  );
    const error = useSelector((state) => state.postReducer.error);

  const openSlider = useSelector((state) => state.postReducer.openSlider);
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState("");

  const openSliderPosts = (e) => {
      setCurrentImageIndex(e.target.alt);
    dispatch(openPostSlider());
  };

  const number = (x) => {
    return <span style={{ fontSize: "16px", fontWeight: "600" }}>{x}</span>;
  };

  const random = number(Math.floor(Math.random() * 10000000));

  const renderPosts = () => {
    return profilePostsList.map((post, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          onClick={openSliderPosts}
        >
          <ProfilePosts
            index={index}
            photoURL={post.photoURL}            
          />
        </div>
      );
    });
  };

  let shouldRedirect = null;
  if (!token) {
    shouldRedirect = <Navigate to="/login" />;
  }

  return (
    <div className={styles.container}>
      {shouldRedirect}
      {openSlider ? (
        <PostSlider
          profilePostsList={profilePostsList}
          currentImageIndex={currentImageIndex}
          display="inherit"
        />
      ) : null}
      <NavBar url={url} uid={uid} />
      <div className={styles.profileContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.infoPhotoContainer}>
            <img src={url} alt="" />
          </div>
          <div className={styles.infoTextContainer}>
            <div className={styles.infoTextContainerDiv}>
              <h2>{userName}</h2>
              <button>Modifica Profilo</button>
              <FontAwesomeIcon icon={faGear} style={{ fontSize: "24px" }} />
            </div>
            <div className={styles.followerContainer}>
              <p className={styles.followerContainerP}>
                Post: {number(profilePostsList.length)}
              </p>
              <p className={styles.followerContainerP}>{random} follower</p>
              <p>{random} profili seguiti</p>
            </div>
          </div>
        </div>
        <div className={styles.followerContainerw750}>
          <div>
            <p className={styles.followerContainerw750P}>Post:</p>
            {number(profilePostsList.length)}
          </div>
          <div>
            <p className={styles.followerContainerw750P}>follower</p>
            {random}
          </div>
          <div>
            <p>profili seguiti</p>
            {random}
          </div>
        </div>
        <div className={styles.elementContainer}>
          <ul
            className={styles.ul}
            style={{ listStyle: "none", display: "flex" }}
          >
            <li>
              <FontAwesomeIcon icon={faBorderAll} className={styles.icon} />
              <p>POST</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faBookmark} className={styles.icon} />
              <p>ELEMENTO SALVATO</p>
            </li>
            <li>
              <FontAwesomeIcon icon={faIdCardClip} className={styles.icon} />
              <p>POST IN CUI TI HANNO TAGGATO</p>
            </li>
          </ul>
        </div>
        <div className={styles.postContainer}>{!error ? renderPosts() : <ErrorMessage message={"Errore di Network"} /> }</div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
