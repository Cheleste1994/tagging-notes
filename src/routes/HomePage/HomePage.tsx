import React from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CheckboxList from '../../components/CheckboxList/CheckboxList';
import Filter from '../../components/Filter/Filter';
import FormAddNote from '../../components/FormAddNote/FormAddNote';
import styles from './Home.module.scss';

export default function HomePage(): JSX.Element {
  return (
    <>
      <main className={styles.main}>
        <Breadcrumb />
        <FormAddNote />
        <Filter />
        <CheckboxList />
      </main>
    </>
  );
}
