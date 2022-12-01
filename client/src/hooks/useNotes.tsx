import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from './http.hook';
import { useRouter } from 'next/router';

export const useNotes = () => {
  const router = useRouter();
  const { token, userId } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [notes, setNotes] = useState([]);

  /**
   * Request all the user's notes from database.
   */
  const requestNotes = useCallback(async () => {
    const data = await request(`http://localhost:5000/notes`, 'GET', null, {
      User: `UserID ${userId}`,
      Authorization: `Bearer ${token}`,
    });

    setNotes(data);
  }, [request, token, userId]);

  /**
   * Navigate to Note page when clicking on a note
   * @param {string} noteId
   * @return {function(): void} Mouse Event;
   */
  const clickHandler = (noteId: string) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      router.push(`/notes/${noteId}`);
    };
  };

  return { requestNotes, clickHandler, notes, loading };
};
