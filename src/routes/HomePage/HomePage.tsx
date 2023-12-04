import React from 'react';
import CheckboxList from '../../components/CheckboxList/CheckboxList';
import styles from './Home.module.scss';

export default function HomePage(): JSX.Element {
  return (
    <>
      <main className={styles.main}>
        <CheckboxList />
      </main>
    </>
  );
}
