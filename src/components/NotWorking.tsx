import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { ScheduleDate } from '../utils/ScheduleDate';

export interface NotWorkingProps {
  timetableDate: ScheduleDate;
}

const NotWorking: FC<NotWorkingProps> = ({ children, timetableDate }) => {
  return (
    <Flex>
      {timetableDate.getDate()} / {timetableDate.getMonth()} No work today
    </Flex>
  );
};

export default NotWorking;
