import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Time as TimeType } from '../types/Time';
import { Format } from '../utils/Format';

export interface TimeProps {
  time: TimeType;
}

const Time: FC<TimeProps> = ({ time }) => {
  const [hours, minutes] = time;
  return (
    <Text>
      {Format.padWithZero(hours)}
      <Text as='sup'>{Format.padWithZero(minutes)}</Text>
    </Text>
  );
};

export default Time;
