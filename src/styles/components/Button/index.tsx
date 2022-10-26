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
        backgroundColor: theme.colors.paper,
        borderWidth: 1,
        borderTopColor: theme.colors.btnPrimary,
        borderEndColor: theme.colors.btnPrimary,
        borderBottomColor: theme.colors.btnPrimary,
        borderRightColor: theme.colors.btnPrimary,
        borderLeftColor: theme.colors.btnPrimary,
      }}
      titleStyle={{
        color: theme.colors.btnPrimary,
        fontSize: theme.textVariants.body.fontSize,
        fontWeight: "700",
      }}
      {...props}
      loading={props.loading}
    />
  );
};

export default Button;
