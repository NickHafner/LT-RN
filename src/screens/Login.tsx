import React, { useContext, useState } from 'react';
import { Box, Input, Button, Text, ThemeModeContext } from '@/styles';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const LoginScreen: React.FC<{ navigation: NavigationProp<any, any> }> = ({ navigation }) => {
  const [email, setEmail] = useState('nickrhafner@gmail.com');
  const [password, setPassword] = useState('$@ndb0x!');
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useContext(ThemeModeContext);
  async function signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    navigation.navigate('Home')
    setTimeout(() => setLoading(false), 250); // timeout to ensure loading spinner does not disappear until after nav animation
  }

  return (
    <Box
      backgroundColor="background"
      flex={1}
      minHeight="100%"
      // paddingVertical="xl"
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
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                // signInWithEmail(email, password);
              }, 2000);
            }}
          />
        </Box>
        <Box paddingHorizontal="xs">
          <Button
            title="Sign in"
            loading={loading}
            type="outline"
            radius="xl"
            onPress={() => {
                setTheme(theme === 'light' ? 'dark' : 'light');
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
