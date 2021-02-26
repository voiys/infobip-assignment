import { ScheduleDateConfig } from '../types/ScheduleDateConfig';
import { Time } from '../types/Time';
import { Weekday } from './Weekday';
import { scheduleDateConfig } from './config';
import { OffsetDate } from './OffsetDate';
import { PredicateDeterminator } from './PredicateDeterminator';
import { AppointmentType } from './AppointmentType';
import { DateTimeCalculator } from './DateTimeCalculator';
import { Appointment } from '../types/Appointment';

class ScheduleDate extends Date {
  config: ScheduleDateConfig;

  constructor(
    date: OffsetDate | ScheduleDate,
    config: ScheduleDateConfig = scheduleDateConfig
  ) {
    super(date);

    this.config = config;
    if (!PredicateDeterminator.isScheduleDate(date)) {
      this.setHours(this.shiftStart[0], this.shiftStart[1], 0, 0);
    }
  }

  get isEven() {
    return this.getDate() % 2 === 0;
  }

  get isWeekend() {
    const day = this.getDay();
    return day === Weekday.Saturday || day === Weekday.Sunday;
  }

  get isWorkingSaturday() {
    return this.getDay() === Weekday.Saturday && this.isEven;
  }

  get isWorkingDay() {
    return this.isWorkingSaturday || !this.isWeekend;
  }

  get shiftStart() {
    return this.isEven
      ? this.config.shiftStartMorning
      : this.config.shiftStartAfternoon;
  }

  get breakTime(): Time {
    return this.isEven ? this.config.breakMorning : this.config.breakAfternoon;
  }

  get endOfShift(): Time {
    const beforeEndHour = this.shiftStart[0] + this.config.hourSteps - 1;
    return [beforeEndHour, 30];
  }

  get breakAppointment() {
    return this.createAppointment(this.breakTime, AppointmentType.Break);
  }

  get endOfShiftAppointment() {
    return this.createAppointment(this.endOfShift, AppointmentType.EndOfShift);
  }

  get randomAppointment() {
    return this.createAppointment([8, 0], AppointmentType.Random);
  }

  // get isValidAppointment() {
  //   // @todo -- implement
  //   const isDuringBreak = DateTimeCalculator.isDuringAppointment(
  //     this.time
  //   );
  //   const isBeforeBreak = true;
  //   const isDuringEndOfShift = true;

  //   if (!isDuringBreak && !isBeforeBreak && !isDuringEndOfShift) {
  //     return true;
  //   }
  //   return false;
  // }

  get time(): Time {
    const hours = this.getHours();
    const minutes = this.getMinutes();
    return [hours, minutes];
  }

  get minuteFactor() {
    const {
      shiftStart: [shiftStartHours],
      config: { minuteSteps, minuteStep },
      time: [hours, minutes],
    } = new ScheduleDate(this);

    const factor =
      (hours - shiftStartHours) * minuteSteps + minutes / minuteStep;

    return factor;
  }

  createAppointment(
    time?: Time,
    type: AppointmentType = AppointmentType.Random
  ) {
    const appointment: Appointment = {
      type,
      date: new ScheduleDate(this),
    };

    if (time) {
      const [hours, minutes] = time;
      appointment.date.setHours(hours, minutes);
    }

    return appointment;
  }

  createUserAppointment(time: Time) {
    return this.createAppointment(time, AppointmentType.User);
  }

  isIntersecting(otherAppointments: ScheduleDate[]) {
    const withDuration = DateTimeCalculator.addAppointmentDuration(this);
    const intersecting = otherAppointments.find(appointment => {
      console.log(withDuration.date.minuteFactor, appointment.minuteFactor);
      return withDuration.date.minuteFactor < appointment.minuteFactor;
    });

    return intersecting !== undefined;
  }
}

export { ScheduleDate };
