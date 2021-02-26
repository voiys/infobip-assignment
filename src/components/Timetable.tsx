import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableBody from './TimetableBody';
import TimetableHeader from './TimetableHeader';

export interface TimetableProps {
  timetableDate: ScheduleDate;
}

const Timetable: FC<TimetableProps> = ({ timetableDate }) => {
  return (
    <VStack>
      <TimetableHeader timetableDate={timetableDate} />
      <TimetableBody timetableDate={timetableDate} />
    </VStack>
  );
};

export default Timetable;
