import { atom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (key: string, initialValue: string) => {
  const getInitialValue = () => {
    const item = AsyncStorage.getItem(key);
    if (item !== null) {
      return item;
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  return atom(
    (get: any) => get(baseAtom),
    (get: any, set: any, update: any) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      AsyncStorage.setItem(key, nextValue);
    }
  );
};
