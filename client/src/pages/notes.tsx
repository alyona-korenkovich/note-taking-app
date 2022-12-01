import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Notes = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    auth.logout();
    router.push('/');
  };

  const [notes] = useState([
    { id: 1, title: 'foolish note #1', content: 'some content' },
    { id: 2, title: 'foolish note #2', content: 'some content' },
    { id: 3, title: 'foolish note #3', content: 'some content' },
  ]);
  return (
    <div>
      <button onClick={logoutHandler}>Log out</button>
      <h1>This is notes page</h1>
      <div>
        {notes.map((note) => (
          <Link href={`/notes/${note.id}`}>{note.title}</Link>
        ))}
      </div>
    </div>
  );
};

export default Notes;
