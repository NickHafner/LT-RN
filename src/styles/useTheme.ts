import { Theme } from './theme'
import { useTheme as useReTheme } from '@shopify/restyle';

const useTheme = () => useReTheme<Theme>();

export default useTheme;
