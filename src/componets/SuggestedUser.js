import styles from "../style/SuggestedUser.module.css";
import { Link } from "react-router-dom";

const SuggestedUser = ({ photoURL, userName, uid }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profilePhotoContainer}>
        <img src={photoURL} alt="" />
      </div>
      <div className={styles.profileNameContainer}>
        <Link
          to={`/user/${uid}`}
          state={{ userId: uid }}
          className={styles.userLink}
        >
          <h5 id={styles.link}>{userName}</h5>
        </Link>
      </div>
      <div className={styles.followContainer}>
        <h5>Segui</h5>
      </div>
    </div>
  );
};

export default SuggestedUser;