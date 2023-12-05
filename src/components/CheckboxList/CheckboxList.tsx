import React, { useEffect, useState } from 'react';
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
  editNote,
  Notes,
  toogleComplete,
  toogleFavorite,
} from '../../redux/slice/notes.slice';
import CloseIcon from '@mui/icons-material/Close';
import Note from '../Note/Note';
import CreateIcon from '@mui/icons-material/Create';
import { TextField } from '@mui/material';
import DrawIcon from '@mui/icons-material/Draw';

export default function CheckboxList() {
  const notesStore = useAppSelector((store) => store.notesReducer);
  const { isFilter, filterTags } = useAppSelector(
    (store) => store.filterReducer
  );

  const [notes, setNotes] = useState(notesStore);

  useEffect(() => {
    if (isFilter) {
      let filterNotes: Notes[] = [];

      filterTags.forEach((tag) => {
        filterNotes = [
          ...filterNotes,
          ...notesStore.filter((note) => note.value.includes(tag)),
        ];
      });

      const sortId = filterNotes
        .sort((a, b) => a.id - b.id)
        .filter((el, index, arr) => el.id !== arr[index + 1]?.id);
      setNotes(sortId);
    } else {
      setNotes(notesStore);
    }
  }, [filterTags, isFilter, notesStore]);

  const [valueEdit, setValueEdit] = useState<{
    value: string;
    id: number | null;
  }>({ value: '', id: null });

  const dispatch = useAppDispatch();

  const handleToggleComplete = (id: number) => {
    dispatch(toogleComplete(id));
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toogleFavorite(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleEditing = (id: number, newValueEdit: string) => {
    if (valueEdit.id) {
      dispatch(editNote({ id, value: valueEdit.value }));
      return setValueEdit({ value: '', id: null });
    }
    setValueEdit({ value: newValueEdit, id });
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
                    onClick={() => handleEditing(id, value)}
                  >
                    {valueEdit.id === id ? (
                      <DrawIcon
                        color={'warning'}
                        sx={{ width: 17, height: 17 }}
                      />
                    ) : (
                      <CreateIcon
                        color={'primary'}
                        sx={{ width: 17, height: 17 }}
                      />
                    )}
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleToggleFavorite(id)}
                  >
                    <FavoriteBorderIcon
                      color={isFavorite ? 'secondary' : 'disabled'}
                    />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleDelete(id)}
                  >
                    <CloseIcon color={'primary'} />
                  </IconButton>
                </>
              }
              disablePadding
            >
              {valueEdit.id === id ? (
                <ListItemButton dense onBlur={() => handleEditing(id, value)}>
                  <ListItemIcon>
                    <Checkbox edge="start" checked={isComplete} />
                  </ListItemIcon>
                  <TextField
                    value={valueEdit.value}
                    onChange={(e) =>
                      setValueEdit({ ...valueEdit, value: e.target.value })
                    }
                    sx={{
                      width: '70%',
                    }}
                  />
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => handleToggleComplete(id)} dense>
                  <ListItemIcon>
                    <Checkbox edge="start" checked={isComplete} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Note valueNote={value} />}
                    sx={{
                      textDecoration: isComplete ? 'line-through' : '',
                      cursor: 'default',
                    }}
                  />
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
