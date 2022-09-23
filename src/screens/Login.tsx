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
      <Input
        label="Email"
        leftIcon={{ color: theme.colors.iconColor, type: 'font-awesome', name: 'envelope' }}
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        placeholder="Email@address.com"
        autoCapitalize={'none'}
        autoCompleteType={undefined}
      />
      <Input
        label="Password"
        leftIcon={{ color: theme.colors.iconColor, type: 'font-awesome', name: 'lock' }}
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={'none'}
        autoCompleteType={undefined}
      />
      <Button
        title="Sign in"
        disabled={loading}
        onPress={() => navigation.navigate({ name: 'Home' })}
      />
    </Box>
  );
};

export default LoginScreen;
