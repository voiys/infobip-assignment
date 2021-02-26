import { Flex, VStack } from '@chakra-ui/react';
import { FC } from 'react';

const TimetableBody: FC = ({ children }) => {
  return <VStack spacing='4'>{children}</VStack>;
};

export default TimetableBody;
