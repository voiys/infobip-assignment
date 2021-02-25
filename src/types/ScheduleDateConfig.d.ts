import { Time } from './Time';

interface ScheduleDateConfig {
  minuteStep: number;
  minuteSteps: number;
  hourStep: number;
  hourSteps: number;
  shiftStartMorning: Time;
  shiftStartAfternoon: Time;
  breakMorning: Time;
  breakAfternoon: Time;
  appointmentDuration: Time;
}

export { ScheduleDateConfig };
