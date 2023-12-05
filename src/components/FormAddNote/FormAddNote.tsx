import React, { useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './FormAddNote.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { addNote } from '../../redux/slice/notes.slice';
import { addTags } from '../../redux/slice/tags.slice';

export default function FormAddNote() {
  const tags = useAppSelector((store) => store.tagsReducer);

  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value && typeof value === 'string') {
      dispatch(addNote(value));

      if (value.includes('#')) {
        const filterValue = value
          .split(' ')
          .filter((el) => el.includes('#'))
          .join('');
        if (filterValue.length > 1) {
          dispatch(addTags(filterValue));
        }
      }

      setValue('');
    }
  };

  const handleChangeInput = (value: string) => {
    setValue(value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Autocomplete
        id="newNote"
        options={Object.values(tags)}
        onChange={(_, newValue) => setValue(newValue || '')}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Add new note"
            value={value}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
        )}
      />

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        type={'submit'}
        style={{ borderBottomLeftRadius: '0', borderStartStartRadius: '0' }}
      />
    </form>
  );
}
