import styles from "../style/PostSlider.module.css";
import Slide from "./Slide";
import SlideW750 from "./SlideW750";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closePostSlider } from "../store/actions/handlePost";
import MediaQuery from "react-responsive";

const PostSlider = ({ profilePostsList, display, currentImageIndex }) => {
  const [closeSlide, setCloseSlide] = useState(display);
  const [current, setCurrent] = useState(parseInt(currentImageIndex));
  const length = profilePostsList.length;
  const dispatch = useDispatch();

  const nextSlide = () => {
    setCurrent( current + 1);
  };

  const prevSlide = () => {
    setCurrent( current - 1);
  };


  const slides = () => {
    return profilePostsList.map((post, index) => {
      return (
        <div key={index} className={styles.imgContainer}>
          {index === current && (
            <MediaQuery minWidth={751}>
              <img src={post.photoURL} alt="" />
            </MediaQuery>
          )}
          {index === current && (
            <MediaQuery maxWidth={750}>
              <SlideW750 post={post} />
            </MediaQuery>
          )}
        </div>
      );
    });
  };

  const infoSlides = () => {
    return profilePostsList.map((post, index) => {
      return (
        <div key={index}>{index === current && <Slide post={post} />}</div>
      );
    });
  };

  return (
    <div className={styles.container} style={{ display: closeSlide }}>
      <div
        role="button"
        className={styles.closeMenu}
        onClick={(e) => {
          e.preventDefault();
          setCloseSlide("none");
          dispatch(closePostSlider());
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      {current !== 0 ? (
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className={styles.arrow}
          onClick={prevSlide}
        />
      ) : (
        <div style={{ padding: "10px", margin: "0 50px" }}></div>
      )}
      <div className={styles.postsContainer}>
        {slides()}
        <div className={styles.infoContainer}>{infoSlides()}</div>
      </div>
      {current !== length - 1 ? (
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className={styles.arrow}
          onClick={nextSlide}
        />
      ) : (
        <div style={{ padding: "10px", margin: "0 50px" }}></div>
      )}
    </div>
  );
};

export default PostSlider;
