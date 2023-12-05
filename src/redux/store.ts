import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slice/notes.slice';
import tagsReducer from './slice/tags.slice';

export const store = configureStore({
  reducer: {
    notesReducer,
    tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
