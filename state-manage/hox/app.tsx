import React, { useEffect, memo } from 'react';
import { useAccountStore } from './store/account';
import { useTaskStore } from './store/task';

export default function App () {
  console.log('app render');
  return <div>
    <Header />
    <Body />
    {/* <Body>
      <Article />
    </Body> */}
  </div>;
}

function Header () {
  const { nickname, setNickname } = useAccountStore();

  console.log('header render');

  useEffect(() => {
    setNickname('王德发');
  }, []);

  return (
    <p>Hello, {nickname}</p>
  );
}

const MemoArticle = memo(Article, () => {
  return true;
});

// function Body ({ children }: { children: React.ReactNode }) {
function Body () {
  console.log('body render');

  const { tasks, addTask } = useTaskStore();

  return (
    <div>
      <button onClick={addTask}>add task</button>
      <ul>
        {tasks.map(task => (
          <li key={task}>{ task }</li>
        )) }
      </ul>
      <Article />
      {/* <MemoArticle /> */}
      {/* { children } */}
    </div>

  );
}

function Article () {
  console.log('article render');
  return <div>
    article
  </div>;
}
