import { AppointmentType } from '../utils/AppointmentType';
import { ScheduleDate } from '../utils/ScheduleDate';

interface Appointment {
  type: AppointmentType;
  date: ScheduleDate;
}

export { Appointment };
