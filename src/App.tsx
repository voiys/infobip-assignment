import { ChakraProvider } from '@chakra-ui/react';
import { FC } from 'react';
import Timetables from './components/Timetables';

const App: FC = () => {
  return (
    <ChakraProvider resetCSS>
      <Timetables />
    </ChakraProvider>
  );
};

export default App;
