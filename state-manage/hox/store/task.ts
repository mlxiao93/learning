import { createGlobalStore } from 'hox';
import { useAccountStore } from './account';
import { useState } from 'react';

let id = 1;

export const [useTaskStore, getTaskStore] = createGlobalStore(() => {
  const { nickname } = useAccountStore();

  const [tasks, setTasks] = useState<string[]>([]);

  function addTask () {
    setTasks((task) => [...task, `${nickname} task${id++}`]);
  }

  return {
    tasks,
    addTask
  };
});
