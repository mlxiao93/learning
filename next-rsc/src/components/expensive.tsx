import { memo } from 'react';

const Expensive = (props: { list: { id: number; text: string }[] }) => {
  console.log('expensive render');

  const { list } = props;

  return (
    <ul>
      {list.map(({ id, text }) => (
        <li key={id}>
          {text} : {id}
        </li>
      ))}
    </ul>
  );
};

export default memo(Expensive, ({ list: prevList }, { list: nextList }) => {
  return prevList === nextList;
});
