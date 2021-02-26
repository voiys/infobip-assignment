import { ChakraProvider } from '@chakra-ui/react';
import { FC, useState } from 'react';
import Timetable from './components/Timetable';
import TimetableInputForm from './components/TimetableInputForm';
import TimetableUserAppointment from './components/TimetableUserAppointment';
import { AppointmentType } from './utils/AppointmentType';
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
    ScheduleDate | undefined
  >(undefined);

  const addAppointment = (appointment: ScheduleDate) => {
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

  return (
    <ChakraProvider resetCSS>
      <Timetable timetableDate={tomorrow} appointments={appointments} />
      {userAppointment ? (
        <TimetableUserAppointment
          appointment={userAppointment}
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
