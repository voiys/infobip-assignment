import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Dispatch, FC, FocusEventHandler, SetStateAction } from 'react';
import { ScheduleDate } from '../utils/ScheduleDate';

type HourOrMinute = 'hour' | 'minute';

export interface TimetableInputProps {
  timetableDate: ScheduleDate;
  type: HourOrMinute;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const TimetableInput: FC<TimetableInputProps> = ({
  timetableDate,
  type,
  value,
  setValue,
}) => {
  const isHour = type === 'hour';
  const [shiftStartHour, shiftStartMinute] = timetableDate.shiftStart;
  const defaultValue = isHour ? shiftStartHour : shiftStartMinute;
  const min = isHour ? shiftStartHour : shiftStartMinute;
  const max = isHour
    ? timetableDate.config.hourSteps - 1 + shiftStartHour
    : (timetableDate.config.minuteSteps - 1) * timetableDate.config.minuteStep;
  const step = isHour
    ? timetableDate.config.hourStep
    : timetableDate.config.minuteStep;
  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleBlur: FocusEventHandler = e => {
    const target = e.target as HTMLInputElement;

    if (target.value.length === 0) {
      setValue(defaultValue.toString());
    }
  };

  return (
    <NumberInput
      size='sm'
      maxW='100px'
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      value={value}
      precision={0}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      <NumberInputField bg='white' />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default TimetableInput;
