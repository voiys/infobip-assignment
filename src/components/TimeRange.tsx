import { Flex, FlexProps } from '@chakra-ui/react';
import { FC } from 'react';
import { Time } from '../types/Time';
import TimeComp from './Time';

export interface TimeRangeProps {
  time1: Time;
  time2: Time;
}

const TimeRange: FC<TimeRangeProps & FlexProps> = ({
  time1,
  time2,
  ...flexProps
}) => {
  return (
    <Flex display='inline-flex' fontSize={{ base: 'sm' }} {...flexProps}>
      <TimeComp time={time1} /> - <TimeComp time={time2} />
    </Flex>
  );
};

export default TimeRange;
