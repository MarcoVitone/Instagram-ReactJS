import styles from "../style/DownloadIcon.module.css";
import appstore from "../img/appstore.png";
import googleplay from "../img/googleplay.png";

const DownloadIcon = () => {
  return (
    <div className={styles.downloadContainer}>
      <div>
        <p>Scarica l'applicazione</p>
      </div>
      <div className={styles.imgDonwload}>
        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
          <img id={styles.appstore} src={appstore} alt="" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D2836D817-6DBA-4A7D-AC61-A592E1393E8D%26utm_content%3Dlo%26utm_medium%3Dbadge">
          <img src={googleplay} alt="" />
        </a>
      </div>
    </div>
  );
};

export default DownloadIcon;
