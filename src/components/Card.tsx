import { CardProps } from '../types/types';
import { useNavigate } from 'react-router-dom';

const Card = ({ character }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <div
      className="w-full flex flex-col rounded-sm overflow-hidden cursor-pointer hover:shadow-lg hover:outline-2 hover:outline-primary-green transition-transform duration-200 hover:scale-105"
      onClick={handleClick}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full max-h-60 object-cover"
      />
      <h5 className="p-2">{character.name}</h5>
    </div>
  );
};

export default Card;
