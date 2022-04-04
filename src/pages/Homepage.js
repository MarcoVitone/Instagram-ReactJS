import ErrorMessage from "../componets/ErrorMessage";
import Loader from "../componets/Loader";
import Story from "../componets/Story";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsersData } from "../store/actions/handlePost";
import Post from "../componets/Post";
import { v4 as uuidv4 } from "uuid";
import styles from "../style/Homepage.module.css";
import NavBar from "../componets/NavBar";
import StoriesContainer from "../componets/StoriesContainer";
import Sidebar from "../componets/Sidebar";


const Homepage = () => {
  const token = localStorage.getItem("token");
  const url = localStorage.getItem("photoURL");
  const userName = localStorage.getItem("userName");
  const uid = localStorage.getItem("userID");
  const dispatch = useDispatch();
  let userList = useSelector((state) => state.postReducer.userList);
  let randomPostsList = useSelector(
    (state) => state.postReducer.randomPostsList
  );
  const openedStories = useSelector((state) => state.postReducer.openStories);
  const loading = useSelector((state) => state.postReducer.loading);
  const error = useSelector((state) => state.postReducer.error);

  useEffect(() => {
    dispatch(fetchUsersData(uid));
  }, []);

  const renderPosts = () => {
    return randomPostsList.map((post) => {
      return (
        <Post
          key={uuidv4()}
          userList={userList}
          photoURL={post.photoURL}
          profileURL={post.profileURL}
          userName={post.userName}
          caption={post?.caption}
          uid={post.userID}
        />
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
      {openedStories ? <Story /> : null}
      <NavBar url={url} uid={uid} />
      <div className={styles.scorllingContainer}>
        <div className={styles.pageContainer}>
          {!loading ? <StoriesContainer /> : <Loader />}
          <div className={styles.postContainer}>
            {!error ? (
              renderPosts()
            ) : (
              <ErrorMessage message={"Errore di Network"} />
            )}
          </div>
        </div>
      </div>
      {!error ? (
        <Sidebar photoURL={url} userName={userName} userList={userList} />
      ) : (
        <ErrorMessage message={"Errore di Network"} />
      )}
    </div>
  );
};

export default Homepage;
