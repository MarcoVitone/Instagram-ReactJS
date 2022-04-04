import styles from "../style/StoriesContainer.module.css";
import { stories } from "../stories";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openStories } from "../store/actions/handlePost";

const StoriesContainer = () => {
  const [storyIndex, setStoryIndex] = useState("");
  const dispatch = useDispatch();

  const openStoriesPage = (e) => {
    e.preventDefault();
    setStoryIndex(e.target.alt);
    dispatch(openStories(storyIndex));
  };

  const singleStory = () => {
    return stories.map((value, index) => {
      return (
        <div
          key={index}
          className={styles.containerPofileImage}
          onClick={openStoriesPage}
        >
          <img src={value[0].header.profileImage} alt={index} />
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      {singleStory()}
    </div>
  );
};

export default StoriesContainer;
