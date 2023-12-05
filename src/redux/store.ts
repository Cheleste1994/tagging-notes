import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slice/notes.slice';
import tagsReducer from './slice/tags.slice';
import filterReducer from './slice/filter.slice';

export const store = configureStore({
  reducer: {
    notesReducer,
    tagsReducer,
    filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
