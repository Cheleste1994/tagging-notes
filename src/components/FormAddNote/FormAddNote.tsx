import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './FormAddNote.module.scss';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { addNote } from '../../redux/slice/notes.slice';

export default function FormAddNote() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get('newNote');
    if (value && typeof value === 'string') {
      dispatch(addNote(value));
      setValue('');
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Add new note"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          sx: { borderTopRightRadius: '0', borderBottomRightRadius: '0' },
        }}
        name={'newNote'}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        type={'submit'}
        style={{ borderBottomLeftRadius: '0', borderStartStartRadius: '0' }}
      ></Button>
    </form>
  );
}
