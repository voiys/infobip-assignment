import { AppointmentType } from '../utils/AppointmentType';

type Appointments = Appointment[];

type InvalidMessage = AppointmentType | undefined;

type AddAppointmentSignature = (newAppointment: Appointment) => void;

type RemoveAppointmentSignature = (
  toBeRemoved: Appointment | undefined
) => void;

export {
  Appointments,
  InvalidMessage,
  AddAppointmentSignature,
  RemoveAppointmentSignature,
};
