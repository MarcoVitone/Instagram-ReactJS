import styles from "../style/Slide.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import scalableImage from "../img/scalableimage.png";

const Slide = ({ post }) => {
  return (
    <div className={styles.infoContainerRendered}>
      <div className={styles.titleContainer}>
        <img src={post.profileURL} alt="" />
        <h6>{post.userName}</h6>
      </div>
      <div>
        <img src={scalableImage} alt="" className={styles.image} />
      </div>
      <div>
        <div className={styles.optionContainer}>
          <div className={styles.optionContainerLeft}>
            <FontAwesomeIcon icon={faHeart} size="2x" />
            <FontAwesomeIcon icon={faComment} size="2x" />
            <FontAwesomeIcon icon={faPaperPlane} size="2x" />
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} size="2x" />
          </div>
        </div>
        <div className={styles.likeContainer}>
          <p>Piace a ...</p>
        </div>
        <div className={styles.commentContainer}>
          <FontAwesomeIcon
            icon={faFaceSmile}
            size="2x"
            id={styles.faFaceSmile}
          />
          <input type="text" placeholder="Aggiungi un commento..." />
          <button>Pubblica</button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
