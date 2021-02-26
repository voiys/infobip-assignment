import { theme, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { AppointmentType } from '../utils/AppointmentType';
import MotionContainer from './MotionContainer';

interface TimetableContainerProps {
  invalidMessage?: AppointmentType;
}

const TimetableContainer: FC<TimetableContainerProps> = ({
  children,
  invalidMessage,
}) => {
  return (
    <MotionContainer
      minW='300px'
      maxW='900px'
      my='10'
      borderRadius='md'
      py='5'
      px='10'
      animate={{
        background:
          invalidMessage !== undefined &&
          invalidMessage !== AppointmentType.User
            ? theme.colors.red[100]
            : theme.colors.white,
      }}
    >
      <VStack
        spacing={{
          base: '4',
          lg: '8',
        }}
      >
        {children}
      </VStack>
    </MotionContainer>
  );
};

export default TimetableContainer;
