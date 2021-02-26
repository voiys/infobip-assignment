import { ScheduleDate } from './ScheduleDate';

class DateTimeCalculator {
  static isDuringAppointment(
    appointment: ScheduleDate,
    targetAppointment: ScheduleDate
  ) {
    const { minuteFactor: appointmentFactor } = appointment;
    const { minuteFactor: targetAppointmentFactor } = targetAppointment;
    const {
      minuteFactor: targetWithDurationFactor,
    } = DateTimeCalculator.addAppointmentDuration(targetAppointment);

    // @todo - test this
    const isBetween =
      appointmentFactor >= targetAppointmentFactor &&
      appointmentFactor < targetWithDurationFactor;

    return isBetween;
  }

  static isBeforeAppointment(
    appointment: ScheduleDate,
    targetAppointment: ScheduleDate
  ) {
    const { minuteFactor: appointmentFactor } = appointment;
    const {
      minuteFactor: targetAppointmentFactor,
    } = DateTimeCalculator.subtractAppointmentDuration(targetAppointment);

    // @todo - test this
    const isBefore = appointmentFactor < targetAppointmentFactor;

    return isBefore;
  }

  static addAppointmentDuration(date: ScheduleDate) {
    const newDate = date.createAppointment();
    const [hours, minutes] = newDate.time;
    const [
      appointmentHours,
      appointmentMinutes,
    ] = newDate.config.appointmentDuration;
    newDate.setHours(hours + appointmentHours, minutes + appointmentMinutes);

    return newDate;
  }

  static subtractAppointmentDuration(date: ScheduleDate) {
    const newDate = date.createAppointment();
    const [hours, minutes] = newDate.time;
    const [
      appointmentHours,
      appointmentMinutes,
    ] = newDate.config.appointmentDuration;
    newDate.setHours(hours - appointmentHours, minutes - appointmentMinutes);

    return newDate;
  }
}

export { DateTimeCalculator };
