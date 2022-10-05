import React, { useState } from "react"
import { Input as NativeInput } from 'react-native-elements';
import useTheme from '../../useTheme';

const Input: React.FC<any> = (props) => {
    const theme = useTheme();
    const [borderColor, setBorderColor] = useState(theme.colors.border)
    return (
      <NativeInput
        inputStyle={{
          color: theme.colors.body,
          paddingHorizontal: 15,
        }}
        labelStyle={{
          color: theme.colors.placeHolder,
        }}
        placeholderTextColor={theme.colors.placeHolder}
        inputContainerStyle={{
          backgroundColor: theme.colors.inputBackground,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          marginTop: 6,
          borderRadius: 6,
          borderColor: borderColor,
        }}
        containerStyle={{paddingHorizontal: theme.spacing.xs}}
        onFocus={() => setBorderColor(theme.colors.borderFocus)}
        onBlur={() => setBorderColor(theme.colors.border)}
        {...props}
      />
    );
}

export default Input;