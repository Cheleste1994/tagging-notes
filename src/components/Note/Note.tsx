import React from 'react';
import Button from '@mui/material/Button';
import styles from './Note.module.scss';

export default function Note({ valueNote }: { valueNote: string }) {
  const handleClickTags = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.note}>
      {valueNote.split(' ').map((el, index) =>
        el[0] === '#' ? (
          <Button variant="text" key={index + el} onClick={handleClickTags}>
            {el}
          </Button>
        ) : (
          <span key={index + el}>{el}</span>
        )
      )}
    </div>
  );
}
