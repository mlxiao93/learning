import React from 'react';
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }: any) => (
  <div data-index={index} style={style}>
    Row {index}
  </div>
);

const Example = () => (
  <List height={550} itemCount={1000} itemSize={35} width={300}>
    {Row}
  </List>
);

export default function LongLongList() {
  return <Example />;
}
