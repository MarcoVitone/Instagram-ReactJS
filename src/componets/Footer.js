import styles from "../style/Footer.module.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className={styles.container}>
            <div className={styles.link}>
                <a href="https://about.facebook.com/meta">Meta</a>
                <a href="https://about.instagram.com/">Informazioni</a>
                <a href="https://about.instagram.com/blog/">Blog</a>
                <a href="https://about.instagram.com/about-us/careers">Lavora con noi</a>
                <a href="https://help.instagram.com/">Assistenza</a>
                <a href="https://developers.facebook.com/docs/instagram">Api</a>
                <a href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0">Privacy</a>
                <a href="https://help.instagram.com/581066165581870">Condizioni</a>
                <a href="https://www.instagram.com/directory/profiles/">Account più Popolari</a>
                <a href="https://www.instagram.com/directory/hashtags/">Hashtag</a>
                <a href="https://www.instagram.com/explore/locations/">Luoghi</a>
            </div>
            <div className={styles.info}>
                <p>Italiano</p>
                <p>© {year} Instagram from Meta</p>
            </div>
        </div>
    )
}

export default Footer;