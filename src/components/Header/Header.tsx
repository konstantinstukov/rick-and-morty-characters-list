import styles from './Header.module.css';
import logo from '/Logo LIFT.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`wrapper ${styles.headerContainer}`}>
        <a href="/">
          <img src={logo} alt="LIFT logo" />
        </a>
      </div>
    </header>
  );
};

export default Header;
