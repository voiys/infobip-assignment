import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { InvalidMessage } from '../types/Common';
import { AppointmentType } from '../utils/AppointmentType';

export interface ErrorMessageProps {
  invalidMessage: InvalidMessage;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ invalidMessage }) => {
  const messageExists = invalidMessage !== undefined;
  let tooltipLabel;

  if (messageExists) {
    switch (invalidMessage) {
      case AppointmentType.Break:
        tooltipLabel = "We're on break.";
        break;
      case AppointmentType.EndOfShift:
        tooltipLabel = 'We go home on time.';
        break;
      case AppointmentType.Random:
        tooltipLabel = 'An appointment already exists at the time.';
        break;
    }
  }

  return <Text>{messageExists && tooltipLabel}</Text>;
};

export default ErrorMessage;
