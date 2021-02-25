import { ScheduleDateConfig } from '../types/ScheduleDateConfig';

const scheduleDateConfig: ScheduleDateConfig = {
  hourStep: 1,
  hourSteps: 6,
  minuteStep: 5,
  minuteSteps: 12,
  shiftStartMorning: [8, 0],
  shiftStartAfternoon: [13, 0],
  breakAfternoon: [16, 0],
  breakMorning: [11, 0],
  appointmentDuration: [0, 30],
};

export { scheduleDateConfig };
