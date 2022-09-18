import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { Box } from '@mlt/styles';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Box
      backgroundColor="mainBackground"
      flex={1}
      paddingVertical="xl"
      justifyContent="center"
      paddingHorizontal="xs">
      <Box>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          autoCompleteType={undefined}
        />
      </Box>
      <Box>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          autoCompleteType={undefined}
        />
      </Box>
      <Box>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => navigation.navigate({ name: 'Home' })}
        />
      </Box>
    </Box>
  );
};

export default LoginScreen;
