// Originally based on react-native-elements button
// github.com/react-native-elements/react-native-elements/blob/next/packages/base/src/Button/Button.tsx
import { Theme, Spacing } from '@/styles/theme';
import useTheme from '@/styles/useTheme';
import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Box from '../Box';
import Text from '../Text';
import { renderNode, StringOmit } from '@/utils';
import { TextProps } from '@shopify/restyle';

const defaultLoadingProps = (
  type: 'solid' | 'clear' | 'outline',
  theme: Theme
): ActivityIndicatorProps => ({
  color: type === 'solid' ? 'white' : theme.colors.brandPrimary,
  size: 'small',
});

const defaultTitleProps = (
  type: 'solid' | 'clear' | 'outline',
  theme: Theme
): TextProps<Theme, true> => ({
  ...theme.textVariants.button,
  color: type === 'solid' ? 'body' : 'brandPrimary',
});

export interface ButtonProps extends PressableProps {
  /** Add button title. */
  title?: string | React.ReactElement<{}>;

  /** Add additional styling for title component. */
  titleProps?: TextProps<Theme, true>;

  /** Add additional styling for button component. */
  buttonStyle?: StyleProp<ViewStyle>;

  /** Type of button. */
  type?: 'solid' | 'clear' | 'outline';

  /** Prop to display a loading spinner. */
  loading?: boolean;

  /** Add additional styling for loading component. */
  loadingStyle?: StyleProp<ViewStyle>;

  /** Add additional props for ActivityIndicator component. */
  loadingProps?: ActivityIndicatorProps;

  /** Displays a linear gradient. See [usage](#lineargradient-usage). */
  linearGradientProps?: object;

  /** Disables user interaction. */
  disabled?: boolean;

  /** Style of the button when disabled. */
  disabledStyle?: StyleProp<ViewStyle>;

  /** Add raised button styling (optional). Has no effect if `type="clear"`. */
  raised?: boolean;

  /** Uppercase button title*/
  uppercase?: boolean;

  /** Button size */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Color of Button
   * @type   string | primary | secondary | success | warning | error
   */
  color?: StringOmit<'primary' | 'secondary' | 'success' | 'error' | 'warning'>;

  /** Radius of button
   * @type   number | sm | md | lg
   */
  radius?: number | StringOmit<keyof Spacing>;
}

type CommonBtn<T> = React.FunctionComponent<
  T & {
    theme?: Theme;
    children?: React.ReactNode | undefined;
  }
>;

export const Button: CommonBtn<ButtonProps> = ({
  onPress = () => {},
  buttonStyle,
  titleProps: passedTitleProps = {},
  type = 'solid',
  loading = false,
  loadingStyle,
  loadingProps: passedLoadingProps,
  size = 'md',
  radius = 'xs',
  uppercase = false,
  color: buttonColor = 'primary',
  title = '',
  disabled = false,
  disabledStyle,
  raised = false,
  children = title,
  ...rest
}) => {
  const theme = useTheme();
  const handleOnPress = useCallback(
    (evt: any) => {
      if (!loading && !disabled) {
        onPress && onPress(evt);
      }
    },
    [loading, onPress, disabled]
  );

  const loadingProps: ActivityIndicatorProps = useMemo(
    () => ({
      ...defaultLoadingProps(type, theme),
      ...passedLoadingProps,
    }),
    [passedLoadingProps, theme, type]
  );

  const titleProps: TextProps<Theme, true> = useMemo(
    () => ({
      ...defaultTitleProps(type, theme),
      ...passedTitleProps,
    }),
    [passedTitleProps, theme, type]
  );

  // const buttonStyle

  const accessibilityState = useMemo(
    () => ({
      disabled: !!disabled,
      busy: !!loading,
    }),
    [disabled, loading]
  );

  const borderRadius = useMemo(
    () => Number(theme.spacing[radius as keyof typeof theme.spacing] ?? (radius || '0')) || 0,
    [radius, theme]
  );

  return (
    <Box overflow="hidden">
      <Pressable
        onPress={handleOnPress}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        disabled={disabled}
        style={({ pressed }) => [
          pressed
            ? {
                opacity: 0.3,
                backgroundColor:
                  type !== 'solid' ? theme.colors.borderFocus : theme.colors.brandPrimary,
                borderColor: theme.colors.borderFocus,
                borderWidth: 1,
                borderRadius,
              }
            : {},
        ]}
        {...rest}>
        <View
          // @ts-ignore
          style={StyleSheet.flatten([
            styles.button,
            {
              minHeight: 35,
              padding: theme.spacing.xs,
              paddingHorizontal: theme.spacing.s,
              borderRadius,
              flexDirection: 'row',
              backgroundColor: type !== 'solid' ? 'transparent' : theme.colors.brandPrimary,
              borderColor: type === 'clear' ? 'transparent' : theme.colors.brandPrimary,
              borderWidth: 1,
            },
            buttonStyle,
            disabled &&
              type === 'solid' && {
                backgroundColor: theme.colors.disabled,
              },
            disabled &&
              type === 'outline' && {
                borderColor: theme.colors.disabled,
              },
            disabled && disabledStyle,
          ])}>
          {loading && (
            <ActivityIndicator
              style={StyleSheet.flatten([styles.loading, loadingStyle])}
              color={loadingProps.color}
              size={loadingProps.size}
              {...loadingProps}
            />
          )}
          {!loading &&
            React.Children.toArray(children).map((child, index) => (
              <React.Fragment key={index}>
                {typeof child === 'string'
                  ? renderNode(Text, child, {
                      ...titleProps,
                    })
                  : child}
              </React.Fragment>
            ))}
        </View>
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 32,
  },
  container: {
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 1,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
      default: {
        fontSize: 18,
      },
    }),
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  raised: {
    backgroundColor: '#fff',
    overflow: 'visible',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  loading: {
    marginVertical: 2,
  },
});

Button.displayName = 'Button';

export default Button;
