import { List, ListItem } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimeRange from './TimeRange';

export interface TimetableBodyProps {
  timetableDate: ScheduleDate;
  appointments: ScheduleDate[];
}

const TimetableBody: FC<TimetableBodyProps> = ({
  timetableDate,
  appointments,
}) => {
  return (
    <List>
      {appointments
        .sort((a, b) => a.time[0] - b.time[0])
        .map((appointment, i) => (
          <ListItem key={i}>
            <TimeRange
              time1={appointment.time}
              time2={
                DateTimeCalculator.addAppointmentDuration(appointment).time
              }
            />
          </ListItem>
        ))}
    </List>
  );
};

export default TimetableBody;
