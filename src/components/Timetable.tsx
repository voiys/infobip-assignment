import { Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Appointment } from '../types/Appointment';
import { Cursor } from '../types/Cursor';
import { AppointmentType } from '../utils/AppointmentType';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import { chakraTheme } from '../utils/theme';
import TimetableBody from './TimetableBody';
import TimetableHeader from './TimetableHeader';

export interface TimetableProps {
  timetableDate: ScheduleDate;
  appointments: Appointment[];
  cursor: Cursor;
}

const Timetable: FC<TimetableProps> = ({
  timetableDate,
  appointments,
  cursor,
}) => {
  return (
    <VStack maxW='max-content' mx='auto'>
      <TimetableHeader timetableDate={timetableDate} />
      <TimetableBody
        timetableDate={timetableDate}
        appointments={appointments.filter(
          appointment =>
            appointment.type !== AppointmentType.Break &&
            appointment.type !== AppointmentType.EndOfShift
        )}
      />
      <Flex w='full' position='relative'>
        <Grid templateColumns='repeat(72, 1fr)' templateRows='50px' w='full'>
          {Array.from({ length: 6 })
            .flatMap((_, i) => [
              `${timetableDate.shiftStart[0] + i}:00`,
              `${timetableDate.shiftStart[0] + i}:30`,
            ])
            .map(i => (
              <GridItem
                key={i}
                colSpan={6}
                textAlign='center'
                transform='translateX(-50%)'
              >
                {i}
              </GridItem>
            ))}
        </Grid>
        <Text
          textAlign='center'
          transform='translateX(50%)'
          position='absolute'
          right='0'
        >
          19:00
        </Text>
      </Flex>
      <Grid templateColumns='repeat(72, 1fr)' templateRows='50px'>
        {Array.from({ length: 72 }).map((_, i) => (
          <GridItem
            key={i}
            borderLeft={i === 0 ? '1px' : '0'}
            borderRight='1px'
            bg={
              i >= cursor.position && i < cursor.position + cursor.length
                ? cursor.color
                : appointments.find(
                    appointment =>
                      i >= appointment.date.minuteFactor &&
                      i <
                        appointment.date.minuteFactor +
                          DateTimeCalculator.addAppointmentDuration(
                            timetableDate
                          ).date.minuteFactor
                  )
                ? chakraTheme.colors.red[100]
                : 'white'
            }
          >
            {i}
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default Timetable;
