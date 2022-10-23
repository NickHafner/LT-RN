import React from 'react';
import { Box, Text } from '@/styles';
import { Button } from 'react-native';

const HomeScreen: React.FC<{  }> = ({  }) => {
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
