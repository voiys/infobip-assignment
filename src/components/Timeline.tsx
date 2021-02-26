import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { Appointments } from '../types/Common';
import { Cursor } from '../types/Cursor';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimelineBody from './TimelineBody';
import TimelineHeader from './TimelineHeader';

export interface TimelineProps {
  timetableDate: ScheduleDate;
  cursor: Cursor;
  appointments: Appointments;
}

const Timeline: FC<TimelineProps> = ({
  timetableDate,
  cursor,
  appointments,
}) => {
  return (
    <Flex direction='column'>
      <TimelineHeader timetableDate={timetableDate} />
      <TimelineBody
        timetableDate={timetableDate}
        cursor={cursor}
        appointments={appointments}
      />
    </Flex>
  );
};

export default Timeline;
