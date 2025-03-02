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
  name: string;
  status: '' | 'alive' | 'dead' | 'unknown';
  gender: '' | 'female' | 'male' | 'genderless' | 'unknown';
  page: number;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterListProps {
  filters: FilterParams;
}
