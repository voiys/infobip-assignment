import { CloseButton, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimeRange from './TimeRange';

export interface TimetableUserAppointmentProps {
  appointment: ScheduleDate;
  removeAppointment: () => void;
}

const TimetableUserAppointment: FC<TimetableUserAppointmentProps> = ({
  appointment,
  removeAppointment,
}) => {
  const { time } = appointment;

  return (
    <Flex>
      <CloseButton onClick={removeAppointment} />
      <TimeRange
        time1={time}
        time2={DateTimeCalculator.addAppointmentDuration(appointment).time}
      />
    </Flex>
  );
};

export default TimetableUserAppointment;
