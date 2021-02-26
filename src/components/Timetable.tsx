import { Box, Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useTimetable } from '../hooks/useTimetable';
import { Appointment } from '../types/Appointment';
import { DateTimeCalculator } from '../utils/DateTimeCalculator';
import { PredicateDeterminator } from '../utils/PredicateDeterminator';
import { ScheduleDate } from '../utils/ScheduleDate';
import { chakraTheme } from '../utils/theme';
import Time from './Time';
import TimetableInputForm from './TimetableInputForm';
import TimetableList from './TimetableList';
import TimetableUserAppointment from './TimetableUserAppointment';

export interface TimetableProps {
  timetableDate: ScheduleDate;
  initialAppointments: Appointment[];
  addAppUserAppointment: (newAppointment: Appointment) => void;
  removeAppUserAppointment: (toBeRemoved: Appointment | undefined) => void;
  userAppointments: Appointment[];
}

const Timetable: FC<TimetableProps> = ({
  timetableDate,
  initialAppointments,
  addAppUserAppointment,
  removeAppUserAppointment,
  userAppointments,
}) => {
  const {
    cursor,
    userAppointment,
    invalidMessage,
    removeAppointment: removeAppointmentFromTimetable,
    addAppointment: addAppointmentToTimetable,
    hours,
    minutes,
    setHours,
    setMinutes,
    appointments,
  } = useTimetable(timetableDate, initialAppointments);

  const addAppointment = (newAppointment: Appointment) => {
    addAppointmentToTimetable(newAppointment);
    addAppUserAppointment(newAppointment);
  };

  const removeAppointment = () => {
    removeAppUserAppointment(userAppointment);
    removeAppointmentFromTimetable();
  };

  return (
    <>
      <VStack maxW='max-content' mx='auto'>
        <TimetableList
          appointments={appointments}
          timetableDate={timetableDate}
        />
        <Flex w='full' position='relative'>
          <Grid templateColumns='repeat(72, 1fr)' templateRows='50px' w='full'>
            {Array.from({ length: 6 })
              .flatMap((_, i) => [
                [timetableDate.shiftStart[0] + i, 0],
                [timetableDate.shiftStart[0] + i, 30],
              ])
              .flatMap((time, i) => (
                <GridItem
                  key={i}
                  colSpan={6}
                  textAlign='center'
                  transform='translateX(-50%)'
                >
                  <Time
                    time={
                      (PredicateDeterminator.isTime(time) && time) || [0, 0]
                    }
                  />
                </GridItem>
              ))}
          </Grid>
          <Box
            textAlign='center'
            transform='translateX(50%)'
            position='absolute'
            right='0'
          >
            <Time time={timetableDate.endOfShift} />
          </Box>
        </Flex>
        <Grid
          templateColumns='repeat(72, minmax(5px, 15px))'
          templateRows='50px'
        >
          {Array.from({ length: 72 }).map((_, i) => (
            <GridItem
              key={i}
              borderLeft={i === 0 ? '1px' : '0'}
              borderRight='1px'
              bg={
                i >= cursor.position && i < cursor.position + cursor.length
                  ? cursor.color
                  : appointments.find(
                      appointment =>
                        i >= appointment.date.minuteFactor &&
                        i <
                          appointment.date.minuteFactor +
                            DateTimeCalculator.addAppointmentDuration(
                              timetableDate
                            ).date.minuteFactor
                    )
                  ? chakraTheme.colors.red[100]
                  : 'white'
              }
            />
          ))}
        </Grid>
        {userAppointment ? (
          <TimetableUserAppointment
            timetableDate={userAppointment.date}
            removeAppointment={removeAppointment}
          />
        ) : userAppointments.length == 2 ? (
          <Box>no more appointments this week</Box>
        ) : (
          <TimetableInputForm
            invalidMessage={invalidMessage}
            appointments={appointments}
            timetableDate={timetableDate}
            hoursValue={hours}
            minutesValue={minutes}
            setHours={setHours}
            setMinutes={setMinutes}
            addAppointment={addAppointment}
          />
        )}
      </VStack>
    </>
  );
};

export default Timetable;
