import Stories from "react-insta-stories";
import { stories } from "../stories";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/Story.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { closeStories } from "../store/actions/handlePost";
import MediaQuery from "react-responsive";

const Story = () => {
  const storyIndex = useSelector((state) => state.postReducer.storyIndex);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(parseInt(storyIndex));
  const length = stories.length;

  const nextSlide = () => {
    setCurrent(current + 1);
  };

  const prevSlide = () => {
    setCurrent(current - 1);
  };

  setTimeout(() => {
    if (current !== length - 1) {
      nextSlide();
    } else {
      dispatch(closeStories());
    }
  }, 15000);

  const openedStories = () => {
    return stories.map((value, index) => {
      return (
        <div key={index}>
          <MediaQuery minWidth={751}>
            {index === current && <Stories stories={value} />}
          </MediaQuery>
          <MediaQuery maxWidth={750}>
            {index === current && <Stories stories={value} />}
          </MediaQuery>
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div
        role="button"
        className={styles.closeStories}
        onClick={(e) => {
          e.preventDefault();
          dispatch(closeStories(storyIndex));
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <MediaQuery minWidth={751}>
        {current !== 0 ? (
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            size="3x"
            style={{ padding: "10px", margin: "0 10px", color: "#FFFFFF" }}
            onClick={prevSlide}
          />
        ) : (
          <div style={{ padding: "10px", margin: "0 50px" }}></div>
        )}
      </MediaQuery>
      <MediaQuery maxWidth={750} minWidth={501}>
        {current !== 0 ? (
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            size="2x"
            style={{
              padding: "10px",
              margin: "10px",
              color: "#FFFFFF",
            }}
            onClick={prevSlide}
          />
        ) : (
          <div style={{ padding: "10px", margin: "0 50px" }}></div>
        )}
      </MediaQuery>
      <MediaQuery maxWidth={500}>
        <div></div>
      </MediaQuery>
      <div className={styles.storyContainer}>{openedStories()}</div>
      <MediaQuery minWidth={751}>
        {current !== length - 1 ? (
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            size="3x"
            style={{ padding: "10px", margin: "0 20px", color: "#FFFFFF" }}
            onClick={nextSlide}
          />
        ) : (
          <div style={{ padding: "10px", margin: "0 50px" }}></div>
        )}
      </MediaQuery>
      <MediaQuery maxWidth={750} minWidth={501}>
        {current !== length - 1 ? (
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            size="2x"
            style={{ padding: "10px", marginRight: "10px", color: "#FFFFFF" }}
            onClick={nextSlide}
          />
        ) : null}
      </MediaQuery>
      <MediaQuery maxWidth={500}>
        <div></div>
      </MediaQuery>
    </div>
  );
};

export default Story;
