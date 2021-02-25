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

export interface InputProps {
  date: ScheduleDate;
  type: HourOrMinute;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input: FC<InputProps> = ({ date, type, value, setValue }) => {
  const isHour = type === 'hour';
  const [shiftStartHour, shiftStartMinute] = date.shiftStart;
  const [
    maxBeforeShiftEndHour,
    maxBeforeShiftEndMinute,
  ] = date.maxBeforeShiftEnd;
  const defaultValue = isHour ? shiftStartHour : shiftStartMinute;
  const min = isHour ? shiftStartHour : shiftStartMinute;
  const max = isHour ? maxBeforeShiftEndHour : maxBeforeShiftEndMinute;
  const step = isHour ? date.config.hourStep : date.config.minuteStep;
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
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      value={value}
      precision={0}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default Input;
