import { useEffect, useState } from 'react';
import { Appointment } from '../types/Appointment';
import { Cursor } from '../types/Cursor';
import { AppointmentType } from '../utils/AppointmentType';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { ScheduleDate } from '../utils/ScheduleDate';

const useTimetable = (
  timetableDate: ScheduleDate,
  initalAppointments: Appointment[]
) => {
  const [hours, setHours] = useState(timetableDate.shiftStart[0].toString());
  const [minutes, setMinutes] = useState(
    timetableDate.shiftStart[1].toString()
  );
  const [appointments, setAppointments] = useState(initalAppointments);
  const [userAppointment, setUserAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const [cursor, setCursor] = useState<Cursor>({
    color: 'blue.100',
    length: DateTimeCalculator.addAppointmentDuration(timetableDate).date
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
          appointment =>
            appointment.type !== AppointmentType.User &&
            appointment.date.getDate() === userAppointment.date.getDate()
        )
      );
    }
  };

  useEffect(() => {
    const cursorOnAppointment = timetableDate.createAppointment([
      parseInt(hours),
      parseInt(minutes),
    ]);
    const newCursorPosition = cursorOnAppointment.date.minuteFactor;
    const appointmentIntersection = cursorOnAppointment.date.intersectionWith(
      appointments
    );
    const cursorIsIntersecting = appointmentIntersection.length > 0;
    let newCursorColor = userAppointment ? 'green.100' : 'blue.100';

    if (cursorIsIntersecting) {
      const appointmentType = appointmentIntersection[0].type;

      setInvalidMessage(appointmentType);
    } else {
      if (invalidMessage !== undefined) setInvalidMessage(undefined);
    }

    setCursor(oldCursor => ({
      ...oldCursor,
      position: newCursorPosition,
      isIntersecting: cursorIsIntersecting,
      color: newCursorColor,
    }));
  }, [hours, minutes, invalidMessage, appointments, timetableDate]);

  return {
    hours,
    minutes,
    appointments,
    userAppointment,
    addAppointment,
    removeAppointment,
    invalidMessage,
    cursor,
    setHours,
    setMinutes,
  };
};

export { useTimetable };
