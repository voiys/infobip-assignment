import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { AppointmentType } from '../utils/AppointmentType';
import { ScheduleDate } from '../utils/ScheduleDate';
import TimetableBody from './TimetableBody';
import TimetableContainer from './TimetableContainer';
import TimetableHeading from './TimetableHeading';

export interface NotWorkingProps {
  timetableDate: ScheduleDate;
}

const NotWorking: FC<NotWorkingProps> = ({ timetableDate }) => {
  return (
    <TimetableContainer invalidMessage={AppointmentType.Random}>
      <TimetableHeading timetableDate={timetableDate} />
      <TimetableBody>
        <Text>Unfortunately, on this day we're closed.</Text>
      </TimetableBody>
    </TimetableContainer>
  );
};

export default NotWorking;
