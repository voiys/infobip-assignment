import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FC } from 'react';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import TimeRange from './TimeRange';
import { CgShapeCircle } from 'react-icons/cg';
import { AppointmentType } from '../utils/AppointmentType';
import { Appointments } from '../types/Common';

export interface TimetableListBodyProps {
  appointments: Appointments;
}

const TimetableListBody: FC<TimetableListBodyProps> = ({ appointments }) => {
  return (
    <List spacing='2'>
      {appointments
        .sort((a, b) => a.date.time[0] - b.date.time[0])
        .map((appointment, i) => (
          <ListItem
            key={i}
            border={appointment.type === AppointmentType.User ? '1px' : '0'}
            borderColor='green.200'
            py='1'
            px='2'
          >
            <ListIcon as={CgShapeCircle} />
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

export default TimetableListBody;
