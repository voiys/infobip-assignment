import { Button, Flex, HStack } from '@chakra-ui/react';
import { Dispatch, FC, FormEventHandler, SetStateAction } from 'react';
import { Time } from '../types/Time';
import { Appointment } from '../types/Appointment';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableInput from './TimetableInput';
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

  return (
    <Flex
      position='relative'
      as='form'
      onSubmit={handleSubmit}
      p='4'
      direction='column'
    >
      <HStack spacing='4' mb='4'>
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
      </HStack>
      <Button
        colorScheme={messageExists ? 'red' : 'green'}
        size='sm'
        display='inline-block'
        mx='auto'
        type='submit'
        isDisabled={messageExists}
      >
        Add appointment
      </Button>
    </Flex>
  );
};

export default TimetableInputForm;
