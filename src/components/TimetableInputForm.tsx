import { Box, Button } from '@chakra-ui/react';
import { Dispatch, FC, FormEventHandler, SetStateAction } from 'react';
import { Time } from '../types/Time';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableInput from './TimetableInput';

export interface TimetableInputFormProps {
  timetableDate: ScheduleDate;
  hoursValue: string;
  minutesValue: string;
  setHours: Dispatch<SetStateAction<string>>;
  setMinutes: Dispatch<SetStateAction<string>>;
}

const TimetableInputForm: FC<TimetableInputFormProps> = ({
  hoursValue,
  minutesValue,
  setHours,
  setMinutes,
  timetableDate,
}) => {
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    const time: Time = [parseInt(hoursValue), parseInt(minutesValue)];

    console.log(`submitted ${time}`);
  };

  return (
    <Box as='form' onSubmit={handleSubmit}>
      <TimetableInput
        timetableDate={timetableDate}
        value={hoursValue}
        setValue={setHours}
        type='hour'
      />
      <TimetableInput
        timetableDate={timetableDate}
        value={minutesValue}
        setValue={setMinutes}
        type='minute'
      />
      <Button type='submit'>Add appointment</Button>
    </Box>
  );
};

export default TimetableInputForm;
