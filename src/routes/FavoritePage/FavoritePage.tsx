import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './FavoritePage.module.scss';

export default function FavoritePage() {
  return (
    <main className={styles.main}>
      <Breadcrumb nameActive={'Favorite'} />
    </main>
  );
}
