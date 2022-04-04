import styles from "../style/SlideW750.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";

const SlideW750 = ({post}) => {
    return (
      <div className={styles.postContainer}>
        <div className={styles.titleContainer}>
          <img src={post.profileURL} alt="" />
          <h6>{post.userName}</h6>
        </div>
        <div>
          <img src={post.photoURL} className={styles.postImage} alt="" />
        </div>
        <div className={styles.optionContainer}>
          <div className={styles.optionContainerLeft}>
            <FontAwesomeIcon icon={faHeart}  />
            <FontAwesomeIcon icon={faComment}  />
            <FontAwesomeIcon icon={faPaperPlane}  />
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark}  />
          </div>
        </div>
        <div className={styles.likeContainer}>
          <p>Piace a ...</p>
        </div>
      </div>
    );
}

export default SlideW750;