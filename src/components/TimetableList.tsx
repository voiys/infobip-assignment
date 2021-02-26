import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { Appointment } from '../types/Appointment';
import { AppointmentType } from '../utils/AppointmentType';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableBody from './TimetableBody';
import TimetableHeader from './TimetableHeader';

export interface TimetableListProps {
  timetableDate: ScheduleDate;
  appointments: Appointment[];
}

const TimetableList: FC<TimetableListProps> = ({
  timetableDate,
  appointments,
}) => {
  return (
    <VStack>
      <TimetableHeader timetableDate={timetableDate} />
      <TimetableBody
        timetableDate={timetableDate}
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
