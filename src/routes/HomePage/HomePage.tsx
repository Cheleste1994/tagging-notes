import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import CheckboxList from '../../components/CheckboxList/CheckboxList';
import Filter from '../../components/Filter/Filter';
import FormAddNote from '../../components/FormAddNote/FormAddNote';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { getNotes, getTags } from '../../redux/slice/indexedDb.slice';
import { loadNotes } from '../../redux/slice/notes.slice';
import { loadTags } from '../../redux/slice/tags.slice';
import styles from './Home.module.scss';

const EXAMPLE_NOTES = [
  {
    id: 1,
    value: 'I wanna go to #shop tomorrow',
    isComplete: false,
    isFavorite: false,
  },
];

export default function HomePage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes()).then(({ payload }) => {
      dispatch(loadNotes(payload || EXAMPLE_NOTES));
    });
    dispatch(getTags()).then(({ payload }) => {
      dispatch(loadTags(payload || []));
    });
  }, [dispatch]);

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
