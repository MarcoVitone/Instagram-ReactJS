import styles from "../style/Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Post = ({ userList, photoURL, profileURL, userName, caption, uid }) => {

  const changeColor = (e) => {
    e.preventDefault();
    if (e.target.style.color === "black") {
      e.target.style.color = "red";
    } else {
      e.target.style.color = "black";
    }
  };

  const randomUser = userList[Math.floor(Math.random() * userList.length)];
  const randomUserName = () => {
    return (
      <p style={{ fontSize: "14px", fontWeight: "600", marginLeft: "3px" }}>
        {randomUser?.userName} e altri
      </p>
    );
  };

  return (
    <div className={styles.postContainer} style={{ marginBottom: "25px" }}>
      <div className={styles.titleContainer}>
        <img src={profileURL} alt="" />
        <Link to={`/user/${uid}`} state={{ userId: uid }} className={styles.linkUser}>
          <h6>{userName}</h6>
        </Link>
      </div>
      <div>
        <img src={photoURL} className={styles.postImage} alt="" />
      </div>
      <div className={styles.optionContainer}>
        <div className={styles.optionContainerLeft}>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            onClick={changeColor}
            style={{ color: "black" }}
          />
          <FontAwesomeIcon icon={faComment} size="2x" />
          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
        </div>
        <div>
          <FontAwesomeIcon icon={faBookmark} size="2x" />
        </div>
      </div>
      <div className={styles.likeContainer}>
        <span>Piace a {randomUserName()}</span>
      </div>
      <div className={styles.infoContainer}>
        <p style={{ fontWeight: "600" }}>{userName} </p>
        <p>{caption}</p>
      </div>
      <hr />
      <div className={styles.commentContainer}>
        <FontAwesomeIcon icon={faFaceSmile} size="2x" id={styles.faFaceSmile} />
        <input type="text" placeholder="Aggiungi un commento..." />
        <button>Pubblica</button>
      </div>
    </div>
  );
};

export default Post;
