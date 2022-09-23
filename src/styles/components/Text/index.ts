import { createText } from '@shopify/restyle';
import { Theme } from '../../theme';

const Text = createText<Theme>();

export default Text;

Text.defaultProps = {
  variant: 'body',
};