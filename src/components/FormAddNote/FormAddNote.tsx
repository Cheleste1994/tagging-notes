import React, { useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './FormAddNote.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { addNote } from '../../redux/slice/notes.slice';

const customFilter = (options: string[], inputValue: string) => {
  const indexValue = inputValue.indexOf('#');
  if (indexValue !== -1) {
    return options.filter((el) => el.includes(inputValue.slice(indexValue)));
  }
  return [];
};

export default function FormAddNote() {
  const tags = useAppSelector((store) => store.tagsReducer);

  const [valueAutocomplete, setValueAutocomplete] = useState('');
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue && typeof inputValue === 'string') {
      dispatch(addNote(inputValue));
      setInputValue('');
      setValueAutocomplete('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Autocomplete
        id="newNote"
        options={Object.values(tags)}
        value={valueAutocomplete}
        onChange={(_, option) => {
          if (option) {
            const index = inputValue.indexOf('#');
            setValueAutocomplete(`${inputValue.slice(0, index)}${option}`);
            setInputValue(`${inputValue.slice(0, index)}${option}`);
          }
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        filterOptions={(options, { inputValue }) =>
          customFilter(options, inputValue)
        }
        isOptionEqualToValue={(option, value) =>
          value.includes(option) || value === undefined || value === ''
        }
        fullWidth
        disableClearable
        freeSolo
        renderInput={(params) => (
          <TextField {...params} fullWidth label="Add new note" />
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
