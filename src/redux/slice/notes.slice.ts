import { createSlice } from '@reduxjs/toolkit';

export type Notes = {
  id: number;
  value: string;
  isComplete: boolean;
  isFavorite: boolean;
};

const initialState: Notes[] = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, { payload }: { payload: string }) => [
      ...state,
      {
        id: state[state.length - 1]?.id + 1 || 1,
        value: payload,
        isComplete: false,
        isFavorite: false,
      },
    ],
    toogleComplete: (state, { payload }: { payload: number }) => {
      const indexNotes = state.findIndex(({ id }) => id === payload);

      state[indexNotes].isComplete = !state[indexNotes].isComplete;
    },
    toogleFavorite: (state, { payload }: { payload: number }) => {
      const indexNotes = state.findIndex(({ id }) => id === payload);

      state[indexNotes].isFavorite = !state[indexNotes].isFavorite;
    },
  },
});

export const { addNote, toogleComplete, toogleFavorite } = notesSlice.actions;

export default notesSlice.reducer;
