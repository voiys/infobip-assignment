import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Appointment } from '../types/Appointment';
import { AppointmentType } from '../utils/AppointmentType';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableListBody from './TimetableListBody';
import TimetableListHeader from './TimetableListHeader';

export interface TimetableListProps {
  timetableDate: ScheduleDate;
  appointments: Appointment[];
}

const TimetableList: FC<TimetableListProps> = ({
  timetableDate,
  appointments,
}) => {
  return (
    <VStack
      background='white'
      border='1px'
      borderRadius='md'
      padding='4'
      display={{ lg: 'none' }}
    >
      <TimetableListHeader timetableDate={timetableDate} />
      <TimetableListBody
        appointments={appointments.filter(
          appointment =>
            appointment.type !== AppointmentType.Break &&
            appointment.type !== AppointmentType.EndOfShift
        )}
      />
    </VStack>
  );
};

export default TimetableList;
