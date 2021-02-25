import { ScheduleDateConfig } from '../types/ScheduleDateConfig';
import { Time } from '../types/Time';
import { Weekday } from '../types/Weekday';
import { scheduleDateConfig } from './config';
import { OffsetDate } from './OffsetDate';

class ScheduleDate extends Date {
  private config: ScheduleDateConfig;
  constructor(
    date: OffsetDate,
    config: ScheduleDateConfig = scheduleDateConfig
  ) {
    super(date);

    this.config = config;
    this.setHours(this.shiftStart[0], this.shiftStart[1], 0, 0);
  }

  get isEven() {
    return this.getDate() % 2 == 0;
  }

  get isWeekend() {
    const day = this.getDay();
    return day == Weekday.Saturday || day === Weekday.Sunday;
  }

  get isWorkingSaturday() {
    return this.getDay() == Weekday.Saturday && this.isEven;
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

  get maxBeforeShiftEnd(): Time {
    const beforeEndHour = this.shiftStart[0] + this.config.hourSteps - 1;
    return [beforeEndHour, 30];
  }

  get appointmentDuration(): Time {
    return this.config.appointmentDuration;
  }
}

export { ScheduleDate };
