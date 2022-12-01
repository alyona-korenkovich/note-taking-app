import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { useNotes } from '../hooks/useNotes';
import { useRouter } from 'next/router';

import styles from './notes.module.scss';

const Notes = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const { requestNotes, notes, loading } = useNotes();

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    router.push('/');
  };

  /**
   * Listen to requests on refreshing of the Notes Table and refresh when needed.
   */
  useEffect(() => {
    if (needsRefresh) {
      requestNotes().then(() => setNeedsRefresh(false));
    }
    // eslint-disable-next-line
  }, [needsRefresh]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/notes');
    } else {
      router.push('/');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <div className={styles.container}>
          <button onClick={logoutHandler}>Log out</button>
          <h1>This is notes page</h1>
          <div className={styles.notes}>
            {loading && <span>Loading...</span>}
            {!loading &&
              notes.map((note) => (
                <div key={note._id} className={styles.note}>
                  <Link href={`/notes/${note._id}`}>{note.title}</Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
