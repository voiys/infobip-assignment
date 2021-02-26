import { Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ScheduleDate } from '../../utils/ScheduleDate';

export interface DateProps {
  timetableDate: ScheduleDate;
}

const Date: FC<DateProps> = ({ timetableDate }) => {
  const [date, month] = timetableDate.dateInfo;
  const weekday = timetableDate.truncatedDay;
  return (
    <Text>
      {weekday}, {date} / {month}
    </Text>
  );
};

export default Date;
