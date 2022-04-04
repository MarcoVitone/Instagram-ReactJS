import styles from "../style/Sidebar.module.css";
import Information from "./Information";
import SuggestedUser from "./SuggestedUser";

const Sidebar = ({ photoURL, userName, userList }) => {
  const suggestedUsers = () => {
    let randomUserList = [];

      for (let i = 0; i < (userList.length - 1 < 5 ? userList.length -1 : 5); i++) {
        randomUserList.push(
          userList[Math.floor(Math.random() * userList.length)]
        );
      }

      const uniqueArray = randomUserList.filter(function (item, pos) {
        return randomUserList.indexOf(item) === pos;
      });

      return uniqueArray?.map((user, index) => {
        return (
          <SuggestedUser
            key={index}
            photoURL={user.photoURL}
            userName={user.userName}
            uid={user.userID}
          />
        );
      });
    } 
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profilePhotoContainer}>
          <img src={photoURL} alt="" />
        </div>
        <div className={styles.profileNameContainer}>
          <h5>{userName}</h5>
        </div>
        <div className={styles.goToContainer}>
          <h5>Passa a</h5>
        </div>
      </div>
      <div className={styles.suggestedContainer}>
        <div className={styles.suggestedTextContainer}>
          <h4>Suggerimenti per te</h4>
          <h5>Mostra tutti</h5>
        </div>
        {suggestedUsers()}
      </div>
      <Information />
    </div>
  );
};

export default Sidebar;
