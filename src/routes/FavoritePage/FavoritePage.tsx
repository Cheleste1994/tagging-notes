import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import styles from './FavoritePage.module.scss';
import { toogleFavorite } from '../../redux/slice/notes.slice';

export default function FavoritePage() {
  const notes = useAppSelector((store) =>
    store.notesReducer.filter((note) => note.isFavorite)
  );

  const dispatch = useAppDispatch();

  const handleToggleFavorite = (id: number) => () => {
    dispatch(toogleFavorite(id));
  };

  return (
    <main className={styles.main}>
      <Breadcrumb nameActive={'Favorite'} />
      <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
        {notes.map(({ id, value, isFavorite }) => {
          return (
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={handleToggleFavorite(id)}
                >
                  <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton dense>
                <ListItemText primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </main>
  );
}
