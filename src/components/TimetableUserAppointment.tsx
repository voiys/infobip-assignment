import { CloseButton, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimeRange from './TimeRange';

export interface TimetableUserAppointmentProps {
  timetableDate: ScheduleDate;
  removeAppointment: () => void;
}

const TimetableUserAppointment: FC<TimetableUserAppointmentProps> = ({
  timetableDate,
  removeAppointment,
}) => {
  const { time } = timetableDate;

  return (
    <Flex>
      <CloseButton onClick={removeAppointment} />
      <TimeRange
        time1={time}
        time2={
          DateTimeCalculator.addAppointmentDuration(timetableDate).date.time
        }
      />
    </Flex>
  );
};

export default TimetableUserAppointment;
