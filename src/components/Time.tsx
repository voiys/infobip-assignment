import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Time as TimeType } from '../types/Time';
import { Format } from '../utils/Format';

export interface TimeProps {
  time: TimeType;
}

const Time: FC<TimeProps> = ({ time }) => {
  let hours, minutes;
  if (time) {
    [hours, minutes] = time;
  } else {
    hours = 0;
    minutes = 0;
  }
  return (
    <Text>
      {Format.padWithZero(hours)}
      <Text as='sup'>{Format.padWithZero(minutes)}</Text>
    </Text>
  );
};

export default Time;
