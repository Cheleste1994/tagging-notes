import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import styles from './Note.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { addTags } from '../../redux/slice/tags.slice';
import { addFilter } from '../../redux/slice/filter.slice';

export default function Note({ valueNote }: { valueNote: string }) {
  const { filterTags } = useAppSelector((store) => store.filterReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (valueNote.includes('#')) {
      const filterValue = valueNote
        .split(' ')
        .filter((el) => el[0] === '#')
        .join('');
      if (filterValue.length > 1) {
        dispatch(addTags(filterValue));
      }
    }
  }, [dispatch, valueNote]);

  const handleClickTags = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    el: string
  ) => {
    event.stopPropagation();
    if (!filterTags.includes(el)) {
      dispatch(addFilter([...filterTags, el]));
    }
  };

  return (
    <div className={styles.note}>
      {valueNote.split(' ').map((el, index) =>
        el[0] === '#' ? (
          <Button
            variant="text"
            key={index + el}
            onClick={(e) => handleClickTags(e, el)}
          >
            {el}
          </Button>
        ) : (
          <span key={index + el}>{el}</span>
        )
      )}
    </div>
  );
}
