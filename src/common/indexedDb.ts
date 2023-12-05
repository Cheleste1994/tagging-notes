import { openDB } from 'idb';

export const dbPromise = openDB('notes-store', 1, {
  upgrade(db) {
    db.createObjectStore('notes');
    db.createObjectStore('tags');
  },
});
