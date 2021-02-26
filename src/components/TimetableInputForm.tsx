import { Box, Button, Flex, Tooltip } from '@chakra-ui/react';
import { Dispatch, FC, FormEventHandler, SetStateAction } from 'react';
import { Time } from '../types/Time';
import { Appointment } from '../types/Appointment';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableInput from './TimetableInput';
import MotionContainer from './MotionContainer';
import { chakraTheme } from '../utils/theme';
import { AppointmentType } from '../utils/AppointmentType';

export interface TimetableInputFormProps {
  timetableDate: ScheduleDate;
  hoursValue: string;
  minutesValue: string;
  setHours: Dispatch<SetStateAction<string>>;
  setMinutes: Dispatch<SetStateAction<string>>;
  addAppointment: (appointment: Appointment) => void;
  appointments: Appointment[];
  invalidMessage: AppointmentType | undefined;
}

const TimetableInputForm: FC<TimetableInputFormProps> = ({
  hoursValue,
  minutesValue,
  setHours,
  setMinutes,
  timetableDate,
  addAppointment,
  appointments,
  invalidMessage,
}) => {
  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();

    const time: Time = [parseInt(hoursValue), parseInt(minutesValue)];

    const newAppointment = timetableDate.createUserAppointment(time);

    if (!(newAppointment.date.intersectionWith(appointments).length > 0)) {
      addAppointment(newAppointment);
    }
  };

  return (
    <Flex position='relative'>
      <Tooltip isOpen={invalidMessage !== undefined} label='hi' placement='top'>
        <MotionContainer
          as='form'
          onSubmit={handleSubmit}
          animate={{
            background:
              invalidMessage !== undefined
                ? chakraTheme.colors.red[100]
                : chakraTheme.colors.white,
          }}
        >
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
        </MotionContainer>
      </Tooltip>
    </Flex>
  );
};

export default TimetableInputForm;
