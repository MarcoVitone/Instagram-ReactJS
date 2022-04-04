import styles from "../style/Information.module.css";

const Information = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <a href="https://about.instagram.com/">Informazioni •</a>
        <a href="https://help.instagram.com/">Assistenza •</a>
        <a href="https://about.facebook.com/meta">Stampa •</a>
        <a href="https://about.instagram.com/blog">Api •</a>
        <a href="https://about.instagram.com/about-us/careers">
          Lavora con noi •
        </a>
        <a href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0">
          Privacy •
        </a>
        <a href="https://help.instagram.com/581066165581870">Condizioni •</a>
        <a href="https://www.instagram.com/explore/locations/">Luoghi •</a>
        <a href="https://www.instagram.com/directory/profiles/">
          Account più Popolari •
        </a>
        <a href="https://www.instagram.com/directory/hashtags/">Hashtag •</a>
        <a href="/">Lingua</a>
      </div>
      <div className={styles.info}>
        <p>© {year} INSTAGRAM FOR META</p>
      </div>
    </div>
  );
};

export default Information;
