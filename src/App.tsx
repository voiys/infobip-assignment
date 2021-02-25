import { ChakraProvider } from '@chakra-ui/react';
import { FC, useState } from 'react';
import Input from './components/Input';
import { OffsetDate } from './utils/OffsetDate';
import { ScheduleDate } from './utils/ScheduleDate';

const App: FC = () => {
  const tomorrow = new ScheduleDate(new OffsetDate(1));
  const [hours, setHours] = useState(tomorrow.shiftStart[0].toString());
  const [minutes, setMinutes] = useState(tomorrow.shiftStart[1].toString());

  return (
    <ChakraProvider resetCSS>
      <Input date={tomorrow} value={hours} setValue={setHours} type='hour' />
      <Input
        date={tomorrow}
        value={minutes}
        setValue={setMinutes}
        type='minute'
      />
    </ChakraProvider>
  );
};

export default App;
