import { createGlobalStore } from 'hox';
import { useState } from 'react';

export const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [nickname, setNickname] = useState<string>('');
  return {
    nickname,
    setNickname
  };
});
