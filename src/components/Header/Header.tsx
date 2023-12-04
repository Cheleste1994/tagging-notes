import { Badge } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/hooks';

export default function Header(): JSX.Element {
  const notes = useAppSelector((store) => store.notesReducer);

  return (
    <header className={styles.header}>
      <div>
        <Link to={'/'}>Tagging Notes</Link>
      </div>
      <NavLink
        to={'/favorite'}
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        <Badge
          badgeContent={notes.filter((note) => note.isFavorite).length}
          color="secondary"
        >
          <FavoriteBorderIcon />
        </Badge>
      </NavLink>
    </header>
  );
}
