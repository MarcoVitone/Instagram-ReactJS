import styles from "../style/ProfilePosts.module.css";

const ProfilePosts = ({photoURL, index}) => {

  return (
    <div className={styles.container}>
      <img src={photoURL} alt={index} />
    </div>
  );
};

export default ProfilePosts;