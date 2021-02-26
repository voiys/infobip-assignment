import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../../utils/DateTimeCalculator';
import { ScheduleDate } from '../../utils/ScheduleDate';
import TimeRange from '../shared/TimeRange';

export interface TimetableListHeaderProps {
  timetableDate: ScheduleDate;
}

const TimetableList: FC<TimetableListHeaderProps> = ({ timetableDate }) => {
  return (
    <HStack spacing='4'>
      <Box fontWeight='bold'>
        Break:{' '}
        <TimeRange
          time1={timetableDate.breakAppointment.date.time}
          time2={
            DateTimeCalculator.addAppointmentDuration(
              timetableDate.breakAppointment.date
            ).date.time
          }
        />
      </Box>
    </HStack>
  );
};

export default TimetableList;
