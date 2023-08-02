import styles from './index.module.scss';
import classnames from 'classnames';
import React, { useState } from 'react';
import KeepAlive from './keep-alive';
import LongLongList from './long-long-list';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return <h1 onClick={async () => {}}>app1</h1>;
  return <LongLongList />;
  return (
    <div>
      <div className={styles.tabs}>
        <div
          onClick={() => setActiveTab(0)}
          className={classnames(
            styles['tab-item'],
            activeTab === 0 && styles['tab-item--active']
          )}
        >
          tab1
        </div>
        <div
          onClick={() => setActiveTab(1)}
          className={classnames(
            styles['tab-item'],
            activeTab === 1 && styles['tab-item--active']
          )}
        >
          tab2
        </div>
      </div>

      <KeepAlive active={activeTab === 0}>
        <Tab1 />
      </KeepAlive>
      <KeepAlive active={activeTab === 1}>
        <Tab2 />
      </KeepAlive>
    </div>
  );
}

function Tab1() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles['tab-container']}>
      <div className={styles.header}>
        tab1 内容
        <p>
          <button onClick={() => setCount(count => count + 1)}>count ++</button>
        </p>
        <p>count: {count}</p>
      </div>
      <div className={styles.body}>
        {Array(100)
          .fill('')
          .map((_v, i) => `段落${i + 1}`)
          .map(item => (
            <p key={item}>{item}</p>
          ))}
      </div>
    </div>
  );
}

function Tab2() {
  return <div className={styles['tab-container']}>tab2 内容</div>;
}
