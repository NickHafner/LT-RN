import React from 'react';
import { Box } from '@mlt/styles';
import { Button } from 'react-native';

const HomeScreen: React.FC<{ handleThemeChange: () => void }> = ({ handleThemeChange }) => {
  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingVertical="xl"
      justifyContent="center"
      paddingHorizontal="xs">
      <Button onPress={handleThemeChange} title="Theme" />
    </Box>
  );
};

export default HomeScreen;
