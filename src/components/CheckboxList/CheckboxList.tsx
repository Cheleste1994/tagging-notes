import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from './CheckboxList.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
  addNote,
  toogleComplete,
  toogleFavorite,
} from '../../redux/slice/notes.slice';

export default function CheckboxList() {
  const notes = useAppSelector((store) => store.notesReducer);

  const dispatch = useAppDispatch();

  const handleToggleComplete = (id: number) => () => {
    dispatch(toogleComplete(id));
  };

  const handleToggleFavorite = (id: number) => () => {
    dispatch(toogleFavorite(id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get('newNote');
    if (value && typeof value === 'string') {
      dispatch(addNote(value));
    }
  };

  return (
    <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Add new note"
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
      {notes.map(({ id, value, isComplete, isFavorite }) => {
        return (
          <ListItem
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={handleToggleFavorite(id)}
              >
                <FavoriteBorderIcon
                  color={isFavorite ? 'secondary' : 'disabled'}
                />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={handleToggleComplete(id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isComplete}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': value }}
                />
              </ListItemIcon>
              <ListItemText
                id={value}
                primary={value}
                sx={{
                  textDecoration: isComplete ? 'line-through' : '',
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
