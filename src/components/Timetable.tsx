import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Appointment } from '../types/Appointment';
import { Cursor } from '../types/Cursor';
import { AppointmentType } from '../utils/AppointmentType';
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
    <VStack>
      <TimetableHeader timetableDate={timetableDate} />
      <TimetableBody
        timetableDate={timetableDate}
        appointments={appointments.filter(
          appointment => appointment.type !== AppointmentType.Break
        )}
      />
      <Grid templateColumns='repeat(72, 1fr)' templateRows='50px 50px'>
        {[
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30',
        ].map(i => (
          <GridItem key={i} colSpan={6}>
            {i}
          </GridItem>
        ))}
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
                      i < appointment.date.minuteFactor + 6
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
