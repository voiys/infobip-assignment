import { List, ListItem } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimeRange from './TimeRange';

export interface TimetableBodyProps {
  timetableDate: ScheduleDate;
}

const TimetableBody: FC<TimetableBodyProps> = ({ timetableDate }) => {
  const appointments = [
    timetableDate.createAppointment([14, 0]),
    timetableDate.createAppointment([15, 0]),
    timetableDate.createAppointment([16, 0]),
    timetableDate.createAppointment([16, 30]),
    timetableDate.createAppointment([18, 30]),
    timetableDate.createAppointment([18, 0]),
  ].sort((a, b) => a.time[0] - b.time[0]);

  return (
    <List>
      {appointments.map((appointment, i) => (
        <ListItem key={i}>
          <TimeRange
            time1={appointment.time}
            time2={DateTimeCalculator.addAppointmentDuration(appointment).time}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TimetableBody;
