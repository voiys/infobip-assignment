import { Box, ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';

const App: FC = () => {
  return (
    <ChakraProvider resetCSS>
      <Box>hi</Box>
    </ChakraProvider>
  );
};

export default App;
