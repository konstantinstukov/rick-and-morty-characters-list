export interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
}

export interface Filters {
  name: string;
  status: string;
  gender: string;
}

export interface CharactersState {
  characters: Character[];
  filters: Filters;
  loading: boolean;
  error: string | null;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface FilterParams {
  name?: string;
  status?: '' | 'alive' | 'dead' | 'unknown';
  gender?: '' | 'female' | 'male' | 'genderless' | 'unknown';
  page?: number;
  location?: {
    url?: string;
  };
}

export interface CharacterListProps {
  filters?: FilterParams;
  maxCards?: number;
  locationId?: string;
  startIndex?: number;
  excludeId?: string;
}

export interface AllCharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterByIdResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface EpisodeByIdResponse {
  ids: number;
  air_date: string;
  episode: string;
  url: string;
}

export interface LocationByIdResponse {
  id: number;
  residents: string[];
}

export interface CardProps {
  character: Character;
}

export interface CharacterSliderProps {
  locationId: string;
  excludeId?: string;
}

export interface SliderButtonProps {
  direction: 'prev' | 'next';
  changeSlide: () => void;
  isDisabled: boolean;
}
