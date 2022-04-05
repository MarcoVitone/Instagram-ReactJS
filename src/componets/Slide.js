import styles from "../style/Slide.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import scalableImage from "../img/scalableimage.png";

const Slide = ({ post }) => {
  const userID = localStorage.getItem("userID");

  const optBtn = () => {
    if (userID === post.userID) return <FontAwesomeIcon icon={faEllipsis} style={{marginRight: "10px"}} />;
  };

  return (
    <div className={styles.infoContainerRendered}>
      <div className={styles.titleContainer}>
        <div style={{display: "flex", alignItems: "center"}}>
          <img src={post.profileURL} alt="" />
          <h6>{post.userName}</h6>
        </div>
        {optBtn()}
      </div>
      <div>
        <img src={scalableImage} alt="" className={styles.image} />
      </div>
      <div>
        <div className={styles.optionContainer}>
          <div className={styles.optionContainerLeft}>
            <FontAwesomeIcon icon={faHeart} style={{ color: "black", fontSize: "30px" }} />
            <FontAwesomeIcon icon={faComment} style={{ color: "black", fontSize: "30px" }} />
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "black", fontSize: "30px" }} />
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} style={{ color: "black", fontSize: "30px" }} />
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
