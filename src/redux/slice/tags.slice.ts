import { createSlice } from '@reduxjs/toolkit';

export interface TagsState {
  [key: string]: string;
}

const initialState: TagsState = {};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTags: (state, { payload }: { payload: string }) => {
      state[payload] = payload;
    },
    loadTags: (state, { payload }: { payload: string[] }) => {
      payload.forEach((value) => {
        state[value] = value;
      });
    },
  },
});

export const { addTags, loadTags } = tagsSlice.actions;

export default tagsSlice.reducer;
