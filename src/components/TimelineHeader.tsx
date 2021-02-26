import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { ScheduleDate } from '../utils/ScheduleDate';
import Time from './Time';
import { Time as TimeType } from '../types/Time';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';

export interface TimelineHeaderProps {
  timetableDate: ScheduleDate;
}

const TimelineHeader: FC<TimelineHeaderProps> = ({ timetableDate }) => {
  const [shiftStartHours] = timetableDate.shiftStart;
  const times = Array.from({
    length: DateTimeCalculator.addAppointmentDuration(timetableDate).date
      .minuteFactor,
  }).flatMap((_, i) => [
    [shiftStartHours + i, 0],
    [shiftStartHours + i, 30],
  ]);

  return (
    <Flex w='full' position='relative' display={{ base: 'none', md: 'flex' }}>
      <Grid
        templateColumns='repeat(72, 1fr)'
        templateRows='min-content'
        w='full'
      >
        {times.map((time, i) => (
          <GridItem
            key={i}
            colSpan={6}
            textAlign='center'
            transform='translateX(-50%)'
          >
            <Time time={time as TimeType} />
          </GridItem>
        ))}
      </Grid>
      <Box
        textAlign='center'
        transform='translateX(50%)'
        position='absolute'
        right='0'
      >
        <Time time={timetableDate.endOfShift} />
      </Box>
    </Flex>
  );
};

export default TimelineHeader;
