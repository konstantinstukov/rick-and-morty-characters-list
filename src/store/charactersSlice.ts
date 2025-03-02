import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Filters, CharactersState } from '../types/types';

const initialState: CharactersState = {
  characters: [],
  filters: {
    name: '',
    status: '',
    gender: '',
  },
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCharacters, setFilters, setLoading, setError } =
  charactersSlice.actions;
export default charactersSlice.reducer;
