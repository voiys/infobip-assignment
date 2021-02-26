import { Button, Flex } from '@chakra-ui/react';
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

  const messageExists = invalidMessage !== undefined;
  let tooltipLabel;

  if (messageExists) {
    switch (invalidMessage) {
      case AppointmentType.Break:
        tooltipLabel = "We're on break.";
        break;
      case AppointmentType.EndOfShift:
        tooltipLabel = 'We go home on time.';
        break;
      case AppointmentType.Random:
        tooltipLabel = 'An appointment already exists at the time.';
        break;
    }
  }

  return (
    <Flex position='relative'>
      <MotionContainer
        p='4'
        as='form'
        onSubmit={handleSubmit}
        animate={{
          background:
            invalidMessage !== undefined
              ? chakraTheme.colors.red[100]
              : chakraTheme.colors.white,
        }}
      >
        <Flex justify='space-between' mb='4'>
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
        </Flex>
        <Button display='inline-block' mx='auto' type='submit'>
          Add appointment
        </Button>
      </MotionContainer>
    </Flex>
  );
};

export default TimetableInputForm;
