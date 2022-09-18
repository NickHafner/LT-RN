import React from "react"
import { Input as NativeInput } from 'react-native-elements';
import { useTheme } from '@mlt/styles';

const Input: React.FC<any> = (props) => {
    const theme = useTheme();
    return (
      <NativeInput
        inputStyle={{
          color: theme.colors.body,
        }}
        labelStyle={{
          color: theme.colors.body,
        }}
        placeholderTextColor={theme.colors.placeHolder}
        {...props}
      />
    );
}

export default Input;