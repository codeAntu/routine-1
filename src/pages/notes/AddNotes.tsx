import { ChevronLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ls from '../../lib/storage';
import BackHeader from '../../components/BackHeader';

export default function Add() {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [id, setId] = useState(Date.now());
   const [notes, setNotes] = useState([]) as any;
   const inputRef = useRef<HTMLTextAreaElement>(null);

   useEffect(() => {
      const notes = ls.get('notes');
      if (notes) {
         setNotes(JSON.parse(notes));
      }
   }, []);

   useEffect(() => {
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
   }, [title, content]);

   useEffect(() => {
      inputRef.current?.focus();
   }, []);

   return (
      <div className='bg-white text-black dark:bg-black dark:text-white'>
         <div className='h-[100dvh] '>
            <BackHeader title='Note' />
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
                     // setIsEdited(true);
                  }}
               />
               <textarea
                  placeholder='Note Something down'
                  className='text-align-top h-[50dvh] w-full bg-transparent text-sm outline-none '
                  value={content}
                  onChange={(e) => {
                     setContent(e.target.value);
                     // setIsEdited(true);
                  }}
                  ref={inputRef}
               />
            </div>
         </div>
      </div>
   );
}
