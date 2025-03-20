export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
  episode: string[];
  location: {
    name: string;
    url: string;
  };
}

export interface CharacterLocation {
  id: number;
  name: string;
  residents: string[];
}

export interface ButtonProps {
  iconDirection: "left" | "right";
  spanText?: string;
  navigateBack?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}
