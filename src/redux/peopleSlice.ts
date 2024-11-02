import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Character {
  name: string;
  height: string;
  mass: string;
}

interface CharacterWithId extends Character {
  id: number;
}

interface PeopleState {
  characters: CharacterWithId[];
  loading: boolean;
}

const initialState: PeopleState = {
  characters: [],
  loading: false,
};

export const fetchCharacters = createAsyncThunk(
  'people/fetchCharacters',
  async (page: number) => {
    const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
    return response.data.results.map((character: Character, index: number) => ({
      id: index + 1 + (page - 1) * 10, 
      name: character.name,
      height: character.height,
      mass: character.mass,
    }));
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    updateCharacter: (state, action) => {
      const index = state.characters.findIndex(char => char.id === action.payload.id);
      if (index !== -1) {
        state.characters[index] = { ...state.characters[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      });
  },
});

export const { updateCharacter } = peopleSlice.actions;
export default peopleSlice.reducer;
