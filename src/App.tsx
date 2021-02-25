import { ChakraProvider } from '@chakra-ui/react';
import { FC, useState } from 'react';
import TimetableInputForm from './components/TimetableInputForm';
import { OffsetDate } from './utils/OffsetDate';
import { ScheduleDate } from './utils/ScheduleDate';

const App: FC = () => {
  const tomorrow = new ScheduleDate(new OffsetDate(1));
  const [hours, setHours] = useState(tomorrow.shiftStart[0].toString());
  const [minutes, setMinutes] = useState(tomorrow.shiftStart[1].toString());

  return (
    <ChakraProvider resetCSS>
      <TimetableInputForm
        timetableDate={tomorrow}
        hoursValue={hours}
        minutesValue={minutes}
        setHours={setHours}
        setMinutes={setMinutes}
      />
    </ChakraProvider>
  );
};

export default App;
