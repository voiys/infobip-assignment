import { Box } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';
import { ScheduleDate } from '../utils/ScheduleDate';
import Input from './TimetableInput';

export interface TimetableInputForm {
  timetableDate: ScheduleDate;
  hoursValue: string;
  minutesValue: string;
  setHours: Dispatch<SetStateAction<string>>;
  setMinutes: Dispatch<SetStateAction<string>>;
}

const TimetableInputForm: FC<TimetableInputForm> = ({
  hoursValue,
  minutesValue,
  setHours,
  setMinutes,
  timetableDate,
}) => {
  return (
    <Box as='form'>
      <Input
        timetableDate={timetableDate}
        value={hoursValue}
        setValue={setHours}
        type='hour'
      />
      <Input
        timetableDate={timetableDate}
        value={minutesValue}
        setValue={setMinutes}
        type='minute'
      />
    </Box>
  );
};

export default TimetableInputForm;
