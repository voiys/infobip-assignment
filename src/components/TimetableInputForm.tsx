import { Box, Button } from '@chakra-ui/react';
import { Dispatch, FC, FormEventHandler, SetStateAction } from 'react';
import { Time } from '../types/Time';
import { Appointment } from '../types/Appointment';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableInput from './TimetableInput';
import { InvalidType } from '../utils/InvalidType';
import MotionContainer from './MotionContainer';
import { chakraTheme } from '../utils/theme';

export interface TimetableInputFormProps {
  timetableDate: ScheduleDate;
  hoursValue: string;
  minutesValue: string;
  setHours: Dispatch<SetStateAction<string>>;
  setMinutes: Dispatch<SetStateAction<string>>;
  addAppointment: (appointment: Appointment) => void;
  appointments: Appointment[];
  userAppointmentValid: InvalidType | undefined;
}

const TimetableInputForm: FC<TimetableInputFormProps> = ({
  hoursValue,
  minutesValue,
  setHours,
  setMinutes,
  timetableDate,
  addAppointment,
  appointments,
  userAppointmentValid,
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
    <MotionContainer
      as='form'
      onSubmit={handleSubmit}
      animate={{
        background:
          userAppointmentValid !== undefined &&
          userAppointmentValid === InvalidType.BreakIntersecting
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
  );
};

export default TimetableInputForm;
