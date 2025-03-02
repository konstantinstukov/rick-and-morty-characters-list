import style from './Card.module.css';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

interface CardProps {
  character: Character;
}

const Card = ({ character }: CardProps) => {
  return (
    <div className={style.card}>
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
