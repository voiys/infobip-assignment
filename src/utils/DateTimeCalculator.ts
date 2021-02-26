import { ScheduleDate } from './ScheduleDate';

class DateTimeCalculator {
  static addAppointmentDuration(date: ScheduleDate) {
    const newDate = date.createAppointment();
    const [hours, minutes] = newDate.date.time;
    const [
      appointmentHours,
      appointmentMinutes,
    ] = newDate.date.config.appointmentDuration;
    newDate.date.setHours(
      hours + appointmentHours,
      minutes + appointmentMinutes
    );

    return newDate;
  }

  static subtractAppointmentDuration(date: ScheduleDate) {
    const newDate = date.createAppointment();
    const [hours, minutes] = newDate.date.time;
    const [
      appointmentHours,
      appointmentMinutes,
    ] = newDate.date.config.appointmentDuration;
    newDate.date.setHours(
      hours - appointmentHours,
      minutes - appointmentMinutes
    );

    return newDate;
  }
}

export { DateTimeCalculator };
