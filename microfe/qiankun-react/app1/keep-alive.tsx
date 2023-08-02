import React from 'react';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function KeepAlive(props: {
  children: ReactNode;
  active: boolean;
}) {
  const { children, active } = props;
  const { current } = useRef({ activeOnce: false });
  const childrenRef = useRef(document.createElement('div'));
  const keepAliveRef = useRef<HTMLDivElement>(null);

  current.activeOnce = current.activeOnce || active;

  useEffect(() => {
    if (active) {
      keepAliveRef.current?.appendChild(childrenRef.current);
    } else {
      childrenRef.current.remove();
    }
  }, [active]);

  return (
    <>
      <div ref={keepAliveRef} />
      {current.activeOnce && createPortal(children, childrenRef.current)}
    </>
  );
}
