import { useQuery } from "@tanstack/react-query";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function getThemeMode() {
  return useQuery(['posts'], async () => {
    const data  = AsyncStorage.getItem('theme');
    return data ?? 'light';
  });
}
