import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbPromise } from '../../common/indexedDb';
import { Notes } from './notes.slice';
import { TagsState } from './tags.slice';

export interface DBState {
  notes: Notes[] | null;
  tags: TagsState;
  isLoadingDb: boolean;
}

const initialState: DBState = { notes: null, tags: {}, isLoadingDb: false };

export const setNotesDb = createAsyncThunk(
  'indexedDb/setNotes',
  async (state: Notes[]) => {
    return (await dbPromise).put('notes', state, 'state');
  }
);

export const setTagsDb = createAsyncThunk(
  'indexedDb/setTags',
  async (state: string[]) => {
    return (await dbPromise).put('tags', state, 'state');
  }
);

export const getNotes = createAsyncThunk('indexedDb/getNotes', async () => {
  return (await dbPromise).get('notes', 'state');
});

export const getTags = createAsyncThunk('indexedDb/getTags', async () => {
  return (await dbPromise).get('tags', 'state');
});

const indexedDbSlice = createSlice({
  name: 'indexedDb',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      if (action.payload) {
        return { ...state, notes: [...action.payload], isLoadingDb: true };
      }
      return { ...state, isLoadingDb: true };
    });
    builder.addCase(
      getTags.fulfilled,
      (state, { payload }: { payload: string[] }) => {
        if (payload) {
          payload.forEach((value) => {
            state.tags[value] = value;
          });
        }
      }
    );
  },
});

export default indexedDbSlice.reducer;
