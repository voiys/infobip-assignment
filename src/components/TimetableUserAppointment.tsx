import { CloseButton, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ScheduleDate } from '../utils/ScheduleDate';

export interface TimetableUserAppointmentProps {
  timetableDate: ScheduleDate;
  removeAppointment: () => void;
}

const TimetableUserAppointment: FC<TimetableUserAppointmentProps> = ({
  removeAppointment,
}) => {
  return (
    <HStack>
      <CloseButton onClick={removeAppointment} />
      <Text>Remove appointment</Text>
    </HStack>
  );
};

export default TimetableUserAppointment;
