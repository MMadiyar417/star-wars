// src/redux/planetsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  // Добавьте другие поля, которые вам могут понадобиться
}

interface PlanetWithId extends Planet {
  id: number; // Уникальный идентификатор для локального состояния
}

interface PlanetsState {
  planets: PlanetWithId[];
  loading: boolean;
}

const initialState: PlanetsState = {
  planets: [],
  loading: false,
};

export const fetchPlanets = createAsyncThunk(
  'planets/fetchPlanets',
  async (page: number) => {
    const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
    return response.data.results.map((planet: Planet, index: number) => ({
      id: index + 1 + (page - 1) * 10, // Уникальный ID на основе страницы
      name: planet.name,
      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
    }));
  }
);

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    updatePlanet: (state, action) => {
      const index = state.planets.findIndex(planet => planet.id === action.payload.id);
      if (index !== -1) {
        state.planets[index] = { ...state.planets[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.loading = false;
        state.planets = action.payload;
      });
  },
});

export const { updatePlanet } = planetsSlice.actions;
export default planetsSlice.reducer;
