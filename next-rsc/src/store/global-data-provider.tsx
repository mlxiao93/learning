'use client';

import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

function useValue() {
  const [globalData, setGlobalData] = useState<any>('init');
  return {
    globalData,
    setGlobalData,
  };
}

type Value = ReturnType<typeof useValue>;

export const GlobalDataContext = createContext<Value>({
  globalData: 'no provider',
  setGlobalData: () => {},
});

export default function GlobalDataProviderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useValue();
  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  return useContext(GlobalDataContext);
}
