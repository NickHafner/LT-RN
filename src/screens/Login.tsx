import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@/styles';
import { logger } from '@/debugging/logger';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Box
      backgroundColor="background"
      flex={1}
      paddingVertical="xl"
      justifyContent="center"
      paddingHorizontal="xs">
      <Box marginBottom="s" padding="s" alignItems="center">
        <Text fontWeight="700" fontSize={20}>
          Minimalist Lifts
        </Text>
      </Box>
      <Box
        borderRadius={10}
        paddingVertical="s"
        backgroundColor="paper"
        borderColor="border"
        borderWidth={2}
        shadowColor="backgroundSubdued"
        shadowOffset={{
          width: 0,
          height: 2,
        }}
        shadowOpacity={0.23}
        shadowRadius={2.23}
        elevation={3}>
        <Input
          label="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          autoCapitalize={'none'}
          autoCompleteType={undefined}
        />
        <Input
          label="Password"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          value={password}
          secureTextEntry={true}
          autoCapitalize={'none'}
          autoCompleteType={undefined}
        />
        <Box paddingHorizontal="xs">
          <Button
            title="Sign in"
            loading={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 3000);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
