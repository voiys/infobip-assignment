import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

const space = {
  'gap-sm': chakraTheme.space[2],
  'gap-md': chakraTheme.space[3],
  'gap-lg': chakraTheme.space[6],
};

const theme = extendTheme({
  space,
});

export { theme, chakraTheme };
