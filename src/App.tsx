import { ChakraProvider } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Timetable from './components/Timetable';
import TimetableInputForm from './components/TimetableInputForm';
import TimetableUserAppointment from './components/TimetableUserAppointment';
import { Appointment } from './types/Appointment';
import { Cursor } from './types/Cursor';
import { AppointmentType } from './utils/AppointmentType';
import { DateTimeCalculator } from './utils/DateTimeCalculator';
import { OffsetDate } from './utils/OffsetDate';
import { RandomGenerator } from './utils/RandomGenerator';
import { ScheduleDate } from './utils/ScheduleDate';

const App: FC = () => {
  const tomorrow = new ScheduleDate(new OffsetDate(3));
  const tomorrowAppointments = RandomGenerator.appointmentsForWeek().filter(
    appointment => {
      const aDate = appointment.date.getDate();
      const tDate = tomorrow.getDate();
      const cond = aDate === tDate;
      return cond;
    }
  );
  const [hours, setHours] = useState(tomorrow.shiftStart[0].toString());
  const [minutes, setMinutes] = useState(tomorrow.shiftStart[1].toString());
  const [appointments, setAppointments] = useState(tomorrowAppointments);
  const [userAppointment, setUserAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const [cursor, setCursor] = useState<Cursor>({
    color: 'blue.100',
    length: DateTimeCalculator.addAppointmentDuration(tomorrow).date
      .minuteFactor,
    position: 0,
    isIntersecting: false,
  });
  const [invalidMessage, setInvalidMessage] = useState<
    AppointmentType | undefined
  >(undefined);

  const addAppointment = (appointment: Appointment) => {
    setUserAppointment(appointment);
    setAppointments(appointments => [...appointments, appointment]);
  };

  const removeAppointment = () => {
    if (userAppointment) {
      setUserAppointment(undefined);
      setAppointments(appointments =>
        appointments.filter(
          appointment => appointment.type !== AppointmentType.User
        )
      );
    }
  };

  useEffect(() => {
    const cursorOnAppointment = tomorrow.createAppointment([
      parseInt(hours),
      parseInt(minutes),
    ]);
    const newCursorPosition = cursorOnAppointment.date.minuteFactor;
    const appointmentIntersection = cursorOnAppointment.date.intersectionWith(
      appointments
    );
    const cursorIsIntersecting = appointmentIntersection.length > 0;

    if (cursorIsIntersecting) {
      const appointmentType = appointmentIntersection[0].type; // @todo -- interpret this

      setInvalidMessage(appointmentType);
    } else {
      if (invalidMessage !== undefined) setInvalidMessage(undefined);
    }

    setCursor(oldCursor => ({
      ...oldCursor,
      position: newCursorPosition,
      isIntersecting: cursorIsIntersecting,
    }));
  }, [hours, minutes, invalidMessage, appointments]);

  return (
    <ChakraProvider resetCSS>
      <Timetable
        timetableDate={tomorrow}
        appointments={appointments}
        cursor={cursor}
      />
      {userAppointment ? (
        <TimetableUserAppointment
          timetableDate={userAppointment.date}
          removeAppointment={removeAppointment}
        />
      ) : (
        <TimetableInputForm
          invalidMessage={invalidMessage}
          appointments={appointments}
          timetableDate={tomorrow}
          hoursValue={hours}
          minutesValue={minutes}
          setHours={setHours}
          setMinutes={setMinutes}
          addAppointment={addAppointment}
        />
      )}
    </ChakraProvider>
  );
};

export default App;
