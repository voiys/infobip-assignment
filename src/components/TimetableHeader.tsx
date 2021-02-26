import { List, ListItem, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimeRange from './TimeRange';

export interface TimetableHeaderProps {
  timetableDate: ScheduleDate;
}

const TimetableHeader: FC<TimetableHeaderProps> = ({ timetableDate }) => {
  const unavailableAppointments = [
    timetableDate.breakAppointment,
    timetableDate.endOfShiftAppointment,
  ];
  return (
    <>
      <Text>Unavailable appointments</Text>
      <List>
        {unavailableAppointments.map((appointment, i) => (
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
    </>
  );
};

export default TimetableHeader;
