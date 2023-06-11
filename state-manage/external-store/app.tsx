import React, { useSyncExternalStore } from 'react';
import { todosStore } from './todos';

export default function App () {
  return <div>
    <Header />
    <Body />
  </div>;
}

function Header () {
  console.log('header render');

  function onClick () {
    todosStore.addTodo();
  }

  return (
    <p>
      <button onClick={onClick}>add todo</button>
    </p>
  );
}

function Body () {
  console.log('body render');

  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{ todo.text }</li>
        )) }
      </ul>
    </div>
  );
}
