// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './peopleSlice';
import planetsReducer from './planetsSlice'; // Убедитесь, что импортируете planetsSlice
import starshipsReducer from './starshipsSlice'; // И starshipsSlice

const store = configureStore({
  reducer: {
    people: peopleReducer,
    planets: planetsReducer, // Добавьте сюда planetsReducer
    starships: starshipsReducer, // И starshipsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
