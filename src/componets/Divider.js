import styles from "../style/Divider.module.css";

const Divider = () => {
  return (
    <div className={styles.divider}>
      <div className={styles.lineBreak}></div>
      <div className={styles.o}>O</div>
      <div className={styles.lineBreak}></div>
    </div>
  );
};

export default Divider;