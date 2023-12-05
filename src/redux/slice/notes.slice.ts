import { createSlice } from '@reduxjs/toolkit';

export type Notes = {
  id: number;
  value: string;
  isComplete: boolean;
  isFavorite: boolean;
};

const initialState: Notes[] = [
  {
    id: 1,
    value: 'I wanna go to #shop tomorrow',
    isComplete: false,
    isFavorite: false,
  },
];

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
    deleteNote: (state, { payload }: { payload: number }) =>
      state.filter((note) => note.id !== payload),
    editNote: (
      state,
      { payload }: { payload: { id: number; value: string } }
    ) => {
      const indexNotes = state.findIndex(({ id }) => id === payload.id);

      state[indexNotes].value = payload.value;
    },
  },
});

export const { addNote, toogleComplete, toogleFavorite, deleteNote, editNote } =
  notesSlice.actions;

export default notesSlice.reducer;
