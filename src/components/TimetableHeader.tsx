import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimeRange from './TimeRange';

export interface TimetableHeaderProps {
  timetableDate: ScheduleDate;
}

const TimetableHeader: FC<TimetableHeaderProps> = ({ timetableDate }) => {
  return (
    <HStack border='1px' spacing='gap-md'>
      <Box>
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

export default TimetableHeader;
