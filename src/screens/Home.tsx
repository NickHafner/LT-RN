import React from 'react';
import Box from '../../styles/Box';
import { Button } from 'react-native';

const HomeScreen: React.FC<{ handleThemeChange: () => void }> = ({ handleThemeChange }) => {
  return (
    <Box
      backgroundColor="mainBackground"
      flex={1}
      paddingVertical="xl"
      justifyContent="center"
      paddingHorizontal="xs">
      <Button onPress={handleThemeChange} title="Theme" />
    </Box>
  );
};

export default HomeScreen;
