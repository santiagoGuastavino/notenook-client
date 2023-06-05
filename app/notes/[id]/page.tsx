import { HttpResponse } from '@/interfaces/http-response.interface';
import { INote } from '@/interfaces/note.intreface';
import styles from '../Notes.module.css';

const defaultUrl: URL = process.env.NEXT_PUBLIC_DEFAULT_URL as unknown as URL;

interface NoteProps {
  params: {
    id: string;
  };
}

async function getNote(noteId: string): Promise<INote> {
  const response: Response = await fetch(
    `${defaultUrl}/notes/${noteId}`,
    {
      next: { revalidate: 10 },
    },
  );
  const httpResponse: HttpResponse<INote> = await response.json();
  console.log(httpResponse)
  return httpResponse.payload;
}

export default async function NotePage({ params }: NoteProps): Promise<JSX.Element> {
  const note = await getNote(params.id);
  console.log(note)
  return (
    <div>
      <h1>notes/{note._id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.updatedAt}</p>
      </div>
    </div>
  )
}
