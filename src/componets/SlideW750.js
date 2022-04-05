import styles from "../style/SlideW750.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const SlideW750 = ({ post }) => {
  const userID = localStorage.getItem("userID");

  const optBtn = () => {
    if (userID === post.userID)
      return (
        <FontAwesomeIcon icon={faEllipsis} style={{ marginRight: "10px" }} />
      );
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.titleContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={post.profileURL} alt="" />
          <h6>{post.userName}</h6>
        </div>
        {optBtn()}
      </div>
      <div>
        <img src={post.photoURL} className={styles.postImage} alt="" />
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.optionContainerLeft}>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faComment} />
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        <div>
          <FontAwesomeIcon icon={faBookmark} />
        </div>
      </div>
      <div className={styles.likeContainer}>
        <p>Piace a ...</p>
      </div>
    </div>
  );
};

export default SlideW750;
