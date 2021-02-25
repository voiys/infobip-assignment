import { Time } from '../types/Time';
import { ScheduleDate } from './ScheduleDate';

class PredicateDeterminator {
  static isScheduleDate(date: Date | ScheduleDate): date is ScheduleDate {
    return (date as ScheduleDate)?.time !== undefined;
  }

  static isTime(value: any): value is Time {
    return Array.isArray(value) && value.length === 2;
  }
}

export { PredicateDeterminator };
