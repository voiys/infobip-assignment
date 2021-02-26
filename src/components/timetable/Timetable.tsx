import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useTimetable } from '../../hooks/useTimetable';
import { Appointment } from '../../types/Appointment';
import {
  AddAppointmentSignature,
  Appointments,
  RemoveAppointmentSignature,
} from '../../types/Common';
import { ScheduleDate } from '../../utils/ScheduleDate';
import ErrorMessage from '../shared/ErrorMessage';
import Timeline from '../timeline/Timeline';
import TimetableInputForm from '../timetable-input/TimetableInputForm';
import TimetableList from '../timetable-list/TimetableList';
import TimetableBody from './TimetableBody';
import TimetableContainer from './TimetableContainer';
import TimetableHeading from './TimetableHeading';
import TimetableUserAppointment from './TimetableUserAppointment';

export interface TimetableProps {
  timetableDate: ScheduleDate;
  initialAppointments: Appointments;
  addAppUserAppointment: AddAppointmentSignature;
  removeAppUserAppointment: RemoveAppointmentSignature;
  userAppointments: Appointments;
}

const Timetable: FC<TimetableProps> = ({
  timetableDate,
  initialAppointments,
  addAppUserAppointment,
  removeAppUserAppointment,
  userAppointments,
}) => {
  const {
    cursor,
    userAppointment,
    invalidMessage,
    removeAppointment: removeAppointmentFromTimetable,
    addAppointment: addAppointmentToTimetable,
    hours,
    minutes,
    setHours,
    setMinutes,
    appointments,
  } = useTimetable(timetableDate, initialAppointments);

  const addAppointment = (newAppointment: Appointment) => {
    addAppointmentToTimetable(newAppointment);
    addAppUserAppointment(newAppointment);
  };

  const removeAppointment = () => {
    removeAppUserAppointment(userAppointment);
    removeAppointmentFromTimetable();
  };

  return (
    <TimetableContainer invalidMessage={invalidMessage}>
      <TimetableHeading timetableDate={timetableDate} />
      <Timeline
        appointments={appointments}
        cursor={cursor}
        timetableDate={timetableDate}
      />
      <TimetableBody>
        <TimetableList
          appointments={appointments}
          timetableDate={timetableDate}
        />

        {userAppointment ? (
          <TimetableUserAppointment
            timetableDate={userAppointment.date}
            removeAppointment={removeAppointment}
          />
        ) : userAppointments.length === 2 ? (
          <Text>No more appointments this week.</Text>
        ) : (
          <TimetableInputForm
            invalidMessage={invalidMessage}
            appointments={appointments}
            timetableDate={timetableDate}
            hoursValue={hours}
            minutesValue={minutes}
            setHours={setHours}
            setMinutes={setMinutes}
            addAppointment={addAppointment}
          />
        )}

        <ErrorMessage invalidMessage={invalidMessage} />
      </TimetableBody>
    </TimetableContainer>
  );
};

export default Timetable;
