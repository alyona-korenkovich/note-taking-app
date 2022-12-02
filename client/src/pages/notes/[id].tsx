import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './Note.module.scss';
import { useRouter } from 'next/router';

import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

type TData = {
  title: string;
  content: string;
  dateCreated: string;
};

const initState: TData = {
  title: '',
  content: '',
  dateCreated: '',
};

export default function () {
  const router = useRouter();
  const { request, loading } = useHttp();
  const { token, userId } = useContext(AuthContext);

  const noteId = router.query.id;
  const [data, setData] = useState(initState);

  const goBack = () => {
    router.push('/notes');
  };

  /**
   * Request a single note from database.
   */
  const requestNote = useCallback(async () => {
    const res: TData = await request(`http://localhost:5000/notes/${noteId}`, 'GET', null, {
      User: `UserID ${userId}`,
      Authorization: `Bearer ${token}`,
    });
    setData(res);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    requestNote();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <span>Loading...</span>}
      {!loading && (
        <div className={styles.container}>
          <button onClick={goBack}>Go back to notes</button>
          <h1>{data.title}</h1>
          <div className={styles.content_wrapper}>{data.content}</div>
          <span>{data.dateCreated}</span>
        </div>
      )}
    </>
  );
}
