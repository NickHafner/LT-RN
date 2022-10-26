import React, { useContext } from 'react';
import { Box, Text } from '@/styles';
import { logger } from '@/debugging/logger';
import { SupaSessionContext } from '@/lib/supaSession';

const HomeScreen: React.FC<{}> = ({ }) => {
  const session = useContext(SupaSessionContext)
  logger.debug(JSON.stringify(session))
  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingVertical="xl"
      justifyContent="center"
      paddingHorizontal="xs">
        <Text>test</Text>
    </Box>
  );
};

export default HomeScreen;
