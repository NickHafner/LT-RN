import React from 'react';
import { Button as NativeButton, ButtonProps as NativeButtonProps } from 'react-native-elements';
import useTheme from '../../useTheme';

export type ButtonProps = NativeButtonProps 

const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme();
  return (
    <NativeButton
      buttonStyle={{
        borderColor: 'border',
        borderRadius: 256,
        backgroundColor: theme.colors.brandPrimary,
      }}
      titleStyle={{
        color: theme.colors.body,
        fontSize: theme.textVariants.body.fontSize,
      }}
      {...props}
      loading={props.loading}
    />
  );
};

export default Button;
