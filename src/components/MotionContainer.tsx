import { Container, ContainerProps, forwardRef } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const MotionContainer = motion<ContainerProps>(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Container ref={ref} {...chakraProps} />;
  })
);

export default MotionContainer;
