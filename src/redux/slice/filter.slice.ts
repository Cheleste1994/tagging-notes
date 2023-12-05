import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  isFilter: boolean;
  filterTags: string[];
}

const initialState: FilterState = {
  isFilter: false,
  filterTags: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (_, { payload }: { payload: string[] }) => ({
      isFilter: true,
      filterTags: payload,
    }),
    clearFilter: () => ({
      isFilter: false,
      filterTags: [],
    }),
  },
});

export const { addFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
