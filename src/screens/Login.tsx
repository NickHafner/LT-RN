import React, { useCallback, useState } from 'react';
import { Box, Input, Button, Text } from '@/styles';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

  const signInWithEmail = async function (email: string, password: string): Promise<boolean> {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    return !!error;
  }
const LoginScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
  const [email, setEmail] = useState('nickrhafner@gmail.com');
  const [password, setPassword] = useState('$@ndb0x!');
  const [loading, setLoading] = useState(false);
  const handleLogin = useCallback(() => {
    setLoading(true);
    // const success = signInWithEmail(email, password);
    // if (success) {
      setTimeout(() => setLoading(false), 750); // timeout to ensure loading spinner does not disappear until after nav animation
    // navigation.navigate('Home');
    // }
  }, []);
  return (
    <Box
      backgroundColor="background"
      flex={1}
      minHeight="100%"
      justifyContent="center"
      paddingHorizontal="xs">
      <Box paddingBottom="s" alignItems="center">
        <Text fontWeight="700" fontSize={24}>
          Minimalist Lifts
        </Text>
      </Box>
      <Box
        borderRadius={10}
        paddingVertical="s"
        backgroundColor="paper"
        borderColor="paper"
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
