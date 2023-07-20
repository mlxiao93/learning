import '@/app/globals.css';
import NoteList from '@/components/note-list';
import SearchField from '@/components/search-field';
import { useSearchParams } from 'next/navigation';

export default function SSR() {
  const searchParams = useSearchParams();
  const kwd = searchParams?.get('kwd') || '';

  // console.log('~~~kwd', kwd);

  return (
    <main className='p-8'>
      <SearchField />
      <NoteList kwd={kwd} />
    </main>
  );
}
