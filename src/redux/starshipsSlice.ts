import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
}

interface StarshipWithId extends Starship {
  id: number; 
}

interface StarshipsState {
  starships: StarshipWithId[];
  loading: boolean;
}

const initialState: StarshipsState = {
  starships: [],
  loading: false,
};

export const fetchStarships = createAsyncThunk(
  'starships/fetchStarships',
  async (page: number) => {
    const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
    return response.data.results.map((starship: Starship, index: number) => ({
      id: index + 1 + (page - 1) * 10, 
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
    }));
  }
);

const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    updateStarship: (state, action) => {
      const index = state.starships.findIndex(starship => starship.id === action.payload.id);
      if (index !== -1) {
        state.starships[index] = { ...state.starships[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarships.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.loading = false;
        state.starships = action.payload;
      });
  },
});

export const { updateStarship } = starshipsSlice.actions;
export default starshipsSlice.reducer;
