import { createSlice } from '@reduxjs/toolkit';

interface TagsState {
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
  },
});

export const { addTags } = tagsSlice.actions;

export default tagsSlice.reducer;
