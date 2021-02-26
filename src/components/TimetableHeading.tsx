import { Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { ScheduleDate } from '../utils/ScheduleDate';
import Date from './Date';

export interface TimetableHeadingProps {
  timetableDate: ScheduleDate;
}

const TimetableHeading: FC<TimetableHeadingProps> = ({ timetableDate }) => {
  return (
    <Heading fontSize='xl' bg='white' px='4' py='2' borderRadius='md'>
      <Date timetableDate={timetableDate} />
    </Heading>
  );
};

export default TimetableHeading;
