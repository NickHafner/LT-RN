import React, { useContext } from 'react';
import { Box, Button, Text, ThemeModeContext } from '@/styles';
import { logger } from '@/debugging/logger';
import { SupaSessionContext } from '@/lib/supaSession';

const HomeScreen: React.FC<{}> = ({}) => {
  const session = useContext(SupaSessionContext);
  const { theme, setTheme } = useContext(ThemeModeContext);

  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingVertical="xl"
      justifyContent="center"
      paddingHorizontal="xs">
      <Box paddingHorizontal="xs">
        <Button
          title="Sign in"
          type="outline"
          radius="xl"
          onPress={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        />
      </Box>
    </Box>
  );
};

export default HomeScreen;
