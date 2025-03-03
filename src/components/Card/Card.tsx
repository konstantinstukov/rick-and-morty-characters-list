import style from './Card.module.css';
import { CardProps } from '../../types/types';
import { useNavigate } from 'react-router-dom';

const Card = ({ character }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div className={style.card} onClick={handleClick}>
      <img
        src={character.image}
        alt={character.name}
        className={style.cardImg}
      />
      <h5 className={style.cardTitle}>{character.name}</h5>
    </div>
  );
};

export default Card;
