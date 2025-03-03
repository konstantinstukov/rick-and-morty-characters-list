import style from './BackButton.module.css';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="button" onClick={() => navigate('/')}>
      <span className="button-icon">
        <svg
          width="10"
          height="16"
          viewBox="0 0 8 12"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path d="M7.62158 1.40625L3.02783 6L7.62158 10.5938L6.21533 12L0.215332 6L6.21533 0L7.62158 1.40625Z" />
        </svg>
      </span>
      <span className={style.backButtonText}>Назад</span>
    </button>
  );
};
