import NoteList from '@/components/note-list';
import SearchField from '@/components/search-field';

export default function Home(props: {
  searchParams: {
    kwd: string;
  };
}) {
  const { searchParams } = props;
  const { kwd } = searchParams;

  console.log('~~kwd', kwd);

  return (
    <main className='p-8'>
      <SearchField />
      <NoteList kwd={kwd} />
    </main>
  );
}
