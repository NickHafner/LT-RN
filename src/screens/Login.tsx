import React, { useCallback, useState } from 'react';
import { Box, Input, Button, Text } from '@/styles';
import { NavigationProp } from '@react-navigation/native';
import { signInWithEmail } from '@/API';

const LoginScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
  const [email, setEmail] = useState('nickrhafner@gmail.com');
  const [password, setPassword] = useState('$@ndb0x!');
  const [loading, setLoading] = useState(false);
  const handleLogin = useCallback(async () => {
    setLoading(true);
    const success = await signInWithEmail(email, password);
    if (success) navigation.navigate('Home');

    setTimeout(() => setLoading(false), 250); // timeout to ensure loading spinner does not disappear until after nav animation
  }, []);

  return (
    <Box backgroundColor="background" flex={1} justifyContent="center" paddingHorizontal="xs">
      <Box paddingBottom="s" alignItems="center">
        <Text fontWeight="700" fontSize={24}>
          Minimalist Lifts
        </Text>
      </Box>
      <Box
        borderRadius={20}
        paddingVertical="s"
        backgroundColor="paper"
        borderColor="paper"
        borderWidth={2}
        shadowColor="backgroundSubdued"
        shadowOffset={{
          width: 0,
          height: 4,
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
            type="outline"
            radius="xl"
            onPress={handleLogin}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
