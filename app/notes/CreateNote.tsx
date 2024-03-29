'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const defaultUrl: URL = process.env.NEXT_PUBLIC_DEFAULT_URL as unknown as URL;

export default function CreateNote(): JSX.Element {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const create = async () => {
    await fetch(`${defaultUrl}/notes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle('');
    setContent('');

    router.refresh();
  }

  return (
    <form onSubmit={create}>
      <h3>
        Create a new Note
      </h3>
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type='submit'>
        Create note
      </button>
    </form>
  )
}
