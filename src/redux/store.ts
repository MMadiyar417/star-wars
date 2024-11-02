import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import peopleReducer from './peopleSlice';
import planetsReducer from './planetsSlice';
import starshipsReducer from './starshipsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    people: peopleReducer,
    planets: planetsReducer,
    starships: starshipsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
