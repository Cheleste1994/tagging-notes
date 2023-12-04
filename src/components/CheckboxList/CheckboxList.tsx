import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
  deleteNote,
  toogleComplete,
  toogleFavorite,
} from '../../redux/slice/notes.slice';
import CloseIcon from '@mui/icons-material/Close';

export default function CheckboxList() {
  const notes = useAppSelector((store) => store.notesReducer);

  const dispatch = useAppDispatch();

  const handleToggleComplete = (id: number) => () => {
    dispatch(toogleComplete(id));
  };

  const handleToggleFavorite = (id: number) => () => {
    dispatch(toogleFavorite(id));
  };

  const handleDelete = (id: number) => () => {
    dispatch(deleteNote(id));
  };

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
        {notes.map(({ id, value, isComplete, isFavorite }) => {
          return (
            <ListItem
              key={id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={handleToggleFavorite(id)}
                  >
                    <FavoriteBorderIcon
                      color={isFavorite ? 'secondary' : 'disabled'}
                    />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={handleDelete(id)}
                  >
                    <CloseIcon color={'primary'} />
                  </IconButton>
                </>
              }
              disablePadding
            >
              <ListItemButton onClick={handleToggleComplete(id)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={isComplete} />
                </ListItemIcon>
                <ListItemText
                  primary={value}
                  sx={{
                    textDecoration: isComplete ? 'line-through' : '',
                    cursor: 'default',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
