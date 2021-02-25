import { Time } from '../types/Time';

class DateTimeCalculator {
  static addTimes(time1: Time, time2: Time): Time {
    const [hours1, minutes1] = time1;
    const [hours2, minutes2] = time2;

    return [hours1 + hours2, minutes1 + minutes2];
  }
}

export { DateTimeCalculator };
