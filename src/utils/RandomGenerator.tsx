import { Appointment } from '../types/Appointment';
import { ScheduleDate } from './ScheduleDate';

class RandomGenerator {
  static integerWithStep(min: number, max: number, step: number) {
    const range = (max - min + step) / step;
    return Math.floor(Math.random() * range) * step + min;
  }

  static appointmentsForWeek(
    week: ScheduleDate[],
    numberOfAppointments: number = 15
  ) {
    const onlyWorkingDays = week.filter(day => day.isWorkingDay);
    const workingDaysWithDefaultAppointments = onlyWorkingDays.flatMap(day => [
      day.breakAppointment,
      day.endOfShiftAppointment,
    ]);

    const appointments = this.generateAppointments(
      onlyWorkingDays,
      numberOfAppointments
    ).slice(0, numberOfAppointments);

    return appointments.concat(workingDaysWithDefaultAppointments);
  }

  static generateAppointments(
    workingDays: ScheduleDate[],
    chunkSize: number = 50
  ) {
    let generatedAppointments: Appointment[] = [];

    for (let i = 0; i < chunkSize; i++) {
      const randomDay =
        workingDays[
          RandomGenerator.integerWithStep(0, workingDays.length - 1, 1)
        ];
      const randomAppointment = randomDay.randomAppointment;
      const { date } = randomAppointment;
      const generatedOnThisDay = generatedAppointments.filter(
        appointment => appointment.date.getDate() === date.getDate()
      );

      if (
        date.isValidRandomDate &&
        date.intersectionWith(generatedOnThisDay).length === 0
      ) {
        generatedAppointments = generatedAppointments.concat(randomAppointment);
      }
    }

    return generatedAppointments;
  }
}

export { RandomGenerator };
