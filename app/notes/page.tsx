import { HttpResponse } from '@/interfaces/http-response.interface';
import { INote } from '@/interfaces/note.intreface';
import Link from 'next/link';
import styles from './Notes.module.css';
import CreateNote from './CreateNote';

const defaultUrl: URL = process.env.NEXT_PUBLIC_DEFAULT_URL as unknown as URL;

interface NoteProps {
  note: INote;
}

async function getNotes(): Promise<INote[]> {
  const response: Response = await fetch(
    `${defaultUrl}/notes`,
    { cache: 'no-store' },
  );
  const httpResponse: HttpResponse<INote[]> = await response.json();
  return httpResponse.payload; 
}

export default async function NotesPage(): Promise<JSX.Element> {
  const notes: INote[] = await getNotes();

  return (
    <div>
      <h1>
        Notes
      </h1>
      <div className={styles.grid}>
        {
          notes?.map((note: INote) => {
            return <Note key={ note._id } note={ note } />
          })
        }
      </div>

      <CreateNote />
    </div>
  )
}

function Note({ note }: NoteProps) {
  const { _id, title, content, updatedAt } = note || {};

  return (
    <Link href={`/notes/${_id}`}>
      <div className={styles.note}>
        <h2>{ title }</h2>
        <h5>{ content }</h5>
        <p>{ updatedAt }</p>
      </div>
    </Link>
  )
}

