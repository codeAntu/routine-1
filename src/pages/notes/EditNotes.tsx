import { useLoaderData, useLocation, useSubmit } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronLeft, Pencil, Trash2 } from 'lucide-react';
import ls from '../../lib/storage';
import BackHeader from '../../components/BackHeader';

export default function Edit() {
   const { state } = useLocation();
   const [isEdited, setIsEdited] = useState(false);
   const [title, setTitle] = useState(state.title);
   const [content, setContent] = useState(state.content);
   const [id, setId] = useState(state.id);
   const [notes, setNotes] = useState([]) as any;
   const [delAlarm, setDelAlarm] = useState(false);
   const [delAlert, setDelAlert] = useState(false);
   const inputRef = useRef<HTMLTextAreaElement>(null);
   console.log(state);

   useEffect(() => {
      const notes = ls.get('notes');
      if (notes) {
         setNotes(JSON.parse(notes));
      }
   }, []);

   function delNote() {
      const temp = notes.filter((note: any) => note.id !== id);
      setNotes(temp);
      ls.set('notes', JSON.stringify(temp));
   }

   useEffect(() => {
      if (isEdited) {
         if (title === '' && content === '') {
            setNotes((prevNotes: any) => {
               const newNotes = prevNotes.filter((n: any) => n.id !== id);
               ls.set('notes', JSON.stringify(newNotes));
               return newNotes;
            });
         } else if (title !== '' || content !== '') {
            const note = {
               title,
               content,
               id,
            };
            if (title === '') note.title = 'Untitled';

            setNotes((prevNotes: any) => {
               const newNotes = prevNotes.filter((n: any) => n.id !== note.id);
               newNotes.push(note);
               ls.set('notes', JSON.stringify(newNotes));

               return newNotes;
            });
         }
      }
   }, [title, content]);

   return (
      <div className='bg-white text-black dark:bg-black dark:text-white'>
         <div className='h-[100dvh]'>
            <BackHeader title='Edit Note' rightIcon='delete' />
            <div className='px-6'>
               <input
                  type='text'
                  name=''
                  id=''
                  className='w-full bg-transparent py-3 text-xl font-semibold outline-none'
                  placeholder='Title'
                  value={title}
                  onChange={(e) => {
                     setTitle(e.target.value);
                     setIsEdited(true);
                  }}
               />
               <textarea
                  placeholder='Note Something down'
                  className='text-align-top h-[50dvh] w-full bg-transparent text-sm outline-none '
                  value={content}
                  onChange={(e) => {
                     setContent(e.target.value);
                     setIsEdited(true);
                  }}
                  ref={inputRef}
               />
            </div>
         </div>
      </div>
   );
}

function Button({
   text = 'Sample Button',
   onClick = () => {},
   color = 'bg-accent',
}: {
   text?: string;
   onClick?: any;
   color?: string;
}) {
   return (
      <button
         className='highlight-transparent tap99 w-full select-none rounded-xl bg-blue-600 p-4 text-sm font-medium text-white'
         onClick={onClick}
      >
         {text}
      </button>
   );
}
