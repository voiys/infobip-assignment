import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

const TimetableBody: FC = ({ children }) => {
  return (
    <Flex direction='column' align='center'>
      {children}
    </Flex>
  );
};

export default TimetableBody;
