import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { Time } from '../types/Time';
import TimeComp from './Time';

export interface TimeRangeProps {
  time1: Time;
  time2: Time;
}

const TimeRange: FC<TimeRangeProps> = ({ time1, time2 }) => {
  return (
    <Flex>
      <TimeComp time={time1} /> - <TimeComp time={time2} />
    </Flex>
  );
};

export default TimeRange;
