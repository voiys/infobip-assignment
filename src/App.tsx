import { Box, ChakraProvider } from '@chakra-ui/react';
import { FC, useState } from 'react';
import Input from './components/Input';
import { OffsetDate } from './utils/OffsetDate';
import { ScheduleDate } from './utils/ScheduleDate';

const App: FC = () => {
  const tomorrow = new ScheduleDate(new OffsetDate());
  const [value, setValue] = useState(tomorrow.shiftStart[0].toString());

  return (
    <ChakraProvider resetCSS>
      <Input date={tomorrow} value={value} setValue={setValue} type='hour' />
    </ChakraProvider>
  );
};

export default App;
