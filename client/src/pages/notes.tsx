import Link from 'next/link';
import { useState } from 'react';

const Notes = () => {
  const [notes] = useState([
    { id: 1, title: 'foolish note #1', content: 'some content' },
    { id: 2, title: 'foolish note #2', content: 'some content' },
    { id: 3, title: 'foolish note #3', content: 'some content' },
  ]);
  return (
    <div>
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
