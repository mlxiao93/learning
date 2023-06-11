export default function NoteList(props: { kwd?: string }) {
  const { kwd } = props;

  console.log('note list render');

  return <div>kwd: {kwd}</div>;
}
