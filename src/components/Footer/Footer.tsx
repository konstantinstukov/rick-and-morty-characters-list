import style from './Footer.module.css';
import logoImg from '/Logo LIFT footer.svg';
import linkedInIcon from '/icon/Linkedin.svg';
import facebookIcon from '/icon/facebook.svg';
import twitterIcon from '/icon/Twitter.svg';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={`wrapper ${style.footerContainer}`}>
        <div className={style.social}>
          <a href="#">
            <img
              className={style.socialImg}
              src={linkedInIcon}
              alt="Linkedin"
            />
          </a>
          <a href="#">
            <img
              className={style.socialImg}
              src={facebookIcon}
              alt="Facebook"
            />
          </a>
          <a href="#">
            <img className={style.socialImg} src={twitterIcon} alt="Twitter" />
          </a>
        </div>
        <div className={style.productInfo}>
          <p>A product of</p>
          <a href="/">
            <img src={logoImg} alt="LIFT logo" />
          </a>
        </div>
        <div className="copyright">
          <p>© 2020 Lift Media. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
