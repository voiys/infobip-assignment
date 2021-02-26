import { FC } from 'react';
import { Grid, GridItem, theme } from '@chakra-ui/react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import { Cursor } from '../types/Cursor';
import { Appointment } from '../types/Appointment';
import TimeRange from './TimeRange';

export interface TimelineBodyProps {
  timetableDate: ScheduleDate;
  cursor: Cursor;
  appointments: Appointment[];
}

const TimelineBody: FC<TimelineBodyProps> = ({
  appointments,
  cursor,
  timetableDate,
}) => {
  return (
    <>
      <Grid
        templateColumns='repeat(72, minmax(5px, 15px))'
        templateRows={{ base: '10px', lg: '50px' }}
      >
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
                ? theme.colors.red[100]
                : 'white'
            }
          />
        ))}
      </Grid>
      <Grid
        templateColumns='repeat(72, minmax(5px, 15px))'
        templateRows={{ base: '10px', lg: '20px' }}
        display={{
          base: 'none',
          lg: 'grid',
        }}
      >
        {Array.from({ length: 72 }).map((_, i) => {
          const appointment = appointments.find(
            appointment => i === appointment.date.minuteFactor
          );
          return (
            <GridItem key={i} bg='transparent' position='relative'>
              {appointment && (
                <TimeRange
                  position='absolute'
                  time1={appointment.date.time}
                  time2={
                    DateTimeCalculator.addAppointmentDuration(appointment.date)
                      .date.time
                  }
                />
              )}
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default TimelineBody;
