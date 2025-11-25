import { SimpleGrid, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

// Container for SimpleGrid

interface Props {
  children: ReactNode;
}

const MotionSimpleGrid = motion(SimpleGrid);

const GridMovies = ({ children }: Props) => {
  return (
    <Container maxW="container.xl" py={8}>
      <MotionSimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5 }}
        spacing={{ base: 4, md: 6, lg: 8 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </MotionSimpleGrid>
    </Container>
  );
};

export default GridMovies;
