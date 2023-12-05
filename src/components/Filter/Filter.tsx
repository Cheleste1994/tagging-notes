import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import styles from './Filter.module.scss';
import { addFilter, clearFilter } from '../../redux/slice/filter.slice';

export default function Filter() {
  const tags = useAppSelector((store) => store.tagsReducer);
  const filter = useAppSelector((store) => store.filterReducer);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.filter}>
      <Autocomplete
        multiple
        limitTags={2}
        id="filter"
        options={Object.values(tags)}
        value={filter.filterTags}
        onChange={(_, option) =>
          !option.length ? dispatch(clearFilter()) : dispatch(addFilter(option))
        }
        renderInput={(params) => <TextField {...params} label="Filter" />}
        fullWidth
        size="small"
      />
    </div>
  );
}
