import styles from "../style/UploadPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faXmark } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "./ErrorMessage";
import scalableImage from "../img/scalableimage.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeElement } from "../store/actions/handlePost";
import { useDropzone } from "react-dropzone";
import { createPost } from "../store/actions/handlePost";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const UploadPage = ({ display }) => {
  const [closeMenu, setCloseMenu] = useState(display);
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState(null);
  const loading = useSelector((state) => state.postReducer.loading);
  const error = useSelector((state) => state.postReducer.error);
  const dispatch = useDispatch();
  
  const handleCaption = (e) => {
    setCaption(e.target.value);
  };
  
  const uploadPost = () => {
    const file = files?.[0];
    const url = localStorage.getItem("photoURL");
    dispatch(createPost(file, caption, url));
    
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const upload = () => {
    return (
      <div className={styles.uploadContainerUpload}>
        <FontAwesomeIcon icon={faPhotoFilm} size="5x" id={styles.icon} />
        <p>Trascina qui le foto</p>
      </div>
    );
  };

  const images = files?.map((file) => {
    return (
      <div key={file?.name} className={styles.uploadContainerUpload}>
        <img
          src={file?.preview}
          style={{ width: "100%", height: "auto" }}
          alt="preview"
        />
      </div>
    );
  });

  return (
    <div className={styles.container} style={{ display: closeMenu }}>
      <div
        role="button"
        className={styles.closeMenu}
        onClick={(e) => {
          e.preventDefault();
          setCloseMenu("none");
          dispatch(closeElement());
          setFiles([]);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div className={styles.scalableContainer}>
        <img src={scalableImage} alt="" className={styles.scalableImage} />
        <div className={styles.uploadContainer}>
          <div className={styles.uploadContainerTitle}>
            {files ? (
              <button
                style={{
                  fontSize: "16px",
                  color: "#0095F6",
                  backgroundColor: "#ffffff",
                  fontWeight: "700",
                }}
                onClick={uploadPost}
              >
                Condividi
              </button>
            ) : (
              <h3>Crea un nuovo post</h3>
            )}
          </div>
          <div className={styles.uploadContainerUpload} {...getRootProps()}>
            {loading ? <Loader /> : null}
            <input {...getInputProps()} />
            {!error ? (
              files ? (
                images
              ) : (
                upload()
              )
            ) : (
              <ErrorMessage message={"Errore di Upload"} />
            )}
          </div>
          {files ? (
            <input
              type="text"
              placeholder="Scrivi una didascalia..."
              onChange={handleCaption}
              style={{
                width: "80%",
                margin: "auto",
                marginBottom: "5px",
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                border: "1px solid rgba(219, 219, 219, 0.86)",
                borderRadius: "3px",
                outline: "none",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
