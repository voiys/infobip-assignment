import { Appointment } from '../types/Appointment';
import { OffsetDate } from './OffsetDate';
import { ScheduleDate } from './ScheduleDate';

class RandomGenerator {
  static integerWithStep(min: number, max: number, step: number) {
    const range = (max - min + step) / step;
    return Math.floor(Math.random() * range) * step + min;
  }

  static appointmentsForWeek(numberOfAppointments: number = 15) {
    const weekFromTomorrow = Array.from({ length: 7 }).map(
      (_, i) => new ScheduleDate(new OffsetDate(1 + i))
    );

    const onlyWorkingDays = weekFromTomorrow.filter(day => day.isWorkingDay);
    const workingDaysWithDefaultAppointments = onlyWorkingDays.flatMap(day => [
      day.breakAppointment,
    ]);

    const appointments = this.generateAppointments(onlyWorkingDays).slice(
      0,
      15
    );

    console.log(appointments.length);

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
