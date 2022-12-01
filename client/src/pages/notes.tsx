import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './notes.module.scss';

const Notes = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    router.push('/');
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/notes');
    } else {
      router.push('/');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const [notes] = useState([
    { id: 1, title: 'foolish note #1', content: 'some content' },
    { id: 2, title: 'foolish note #2', content: 'some content' },
    { id: 3, title: 'foolish note #3', content: 'some content' },
  ]);
  return (
    <>
      {isAuthenticated && (
        <div className={styles.container}>
          <button onClick={logoutHandler}>Log out</button>
          <h1>This is notes page</h1>
          <div className={styles.notes}>
            {notes.map((note) => (
              <div key={note.id} className={styles.note}>
                <Link href={`/notes/${note.id}`}>{note.title}</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
