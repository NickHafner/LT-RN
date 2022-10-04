import React, { useState } from 'react';
import { Box, Button, Input, useTheme } from '@mlt/styles';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingVertical="xl"
      justifyContent="center"
      paddingHorizontal="xs">
      <Box
        borderRadius={10}
        paddingVertical="s"
        backgroundColor="paper"
        borderColor="border"
        borderWidth={2}>
        <Input
          label="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          autoCapitalize={'none'}
          autoCompleteType={undefined}
        />
        <Input
          label="Password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize={'none'}
          autoCompleteType={undefined}
        />
        <Box paddingHorizontal="xs">
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => navigation.navigate({ name: 'Home' })}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
