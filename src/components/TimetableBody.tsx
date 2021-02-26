import { List, ListItem } from '@chakra-ui/react';
import { FC } from 'react';
import { Appointment } from '../types/Appointment';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimeRange from './TimeRange';

export interface TimetableBodyProps {
  timetableDate: ScheduleDate;
  appointments: Appointment[];
}

const TimetableBody: FC<TimetableBodyProps> = ({
  timetableDate,
  appointments,
}) => {
  return (
    <List>
      {appointments
        .sort((a, b) => a.date.time[0] - b.date.time[0])
        .map((appointment, i) => (
          <ListItem key={i}>
            <TimeRange
              time1={appointment.date.time}
              time2={
                DateTimeCalculator.addAppointmentDuration(appointment.date).date
                  .time
              }
            />
          </ListItem>
        ))}
    </List>
  );
};

export default TimetableBody;
