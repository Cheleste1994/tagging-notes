import { Badge } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div>
        <Link to={'/'}>Tagging Notes</Link>
      </div>
      <Link to={'/favorite'}>
        <Badge badgeContent={5} color="secondary">
          <FavoriteBorderIcon />
        </Badge>
      </Link>
    </header>
  );
}
