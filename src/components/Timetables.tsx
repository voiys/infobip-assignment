import { Flex } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Appointment } from '../types/Appointment';
import { AppointmentType } from '../utils/AppointmentType';
import { OffsetDate } from '../utils/OffsetDate';
import { RandomGenerator } from '../utils/RandomGenerator';
import { ScheduleDate } from '../utils/ScheduleDate';
import NotWorking from './NotWorking';
import Timetable from './Timetable';

const Timetables: FC = () => {
  const weekFromTomorrow = Array.from({ length: 7 }).map(
    (_, i) => new ScheduleDate(new OffsetDate(1 + i))
  );
  const allAppointments = RandomGenerator.appointmentsForWeek(
    weekFromTomorrow,
    15
  );
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);

  const addAppUserAppointment = (newAppointment: Appointment) => {
    const existingForTheDate = userAppointments.find(
      appointment => appointment.date === newAppointment.date
    );

    if (!existingForTheDate) {
      setUserAppointments([...userAppointments, newAppointment]);
    }
  };

  const removeAppUserAppointment = (toBeRemoved: Appointment | undefined) => {
    if (toBeRemoved) {
      const existingForTheDate = userAppointments.find(
        appointment =>
          appointment.date.getDate() === toBeRemoved.date.getDate() &&
          appointment.type === AppointmentType.User
      );

      if (existingForTheDate) {
        setUserAppointments(
          userAppointments.filter(
            appointment =>
              appointment.date.getDate() ===
                existingForTheDate.date.getDate() &&
              appointment.type !== AppointmentType.User
          )
        );
      }
    }
  };

  return (
    <Flex direction='column' align='center'>
      {weekFromTomorrow.map((day, i) =>
        day.isWorkingDay ? (
          <Timetable
            key={i}
            userAppointments={userAppointments}
            addAppUserAppointment={addAppUserAppointment}
            removeAppUserAppointment={removeAppUserAppointment}
            timetableDate={day}
            initialAppointments={allAppointments.filter(appointment => {
              const appointmentDate = appointment.date.getDate();
              const thisDate = day.getDate();
              const cond = appointmentDate === thisDate;
              return cond;
            })}
          />
        ) : (
          <NotWorking key={i} timetableDate={day} />
        )
      )}
    </Flex>
  );
};

export default Timetables;
