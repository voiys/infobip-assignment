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
import { ScheduleDate } from './utils/ScheduleDate';

const App: FC = () => {
  const tomorrow = new ScheduleDate(new OffsetDate(1));
  const [hours, setHours] = useState(tomorrow.shiftStart[0].toString());
  const [minutes, setMinutes] = useState(tomorrow.shiftStart[1].toString());
  const [appointments, setAppointments] = useState([
    tomorrow.breakAppointment,
    tomorrow.endOfShiftAppointment,
  ]);
  const [userAppointment, setUserAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const [cursor, setCursor] = useState<Cursor>({
    color: 'red.200',
    length: DateTimeCalculator.addAppointmentDuration(tomorrow).date
      .minuteFactor,
    position: 0,
  });

  const addAppointment = (appointment: Appointment) => {
    // add validation here

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

  useEffect(() => {}, []);

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
