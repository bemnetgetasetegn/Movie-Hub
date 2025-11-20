import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";

// Container for SimpleGrid

interface Props {
  children: ReactNode;
}

const GridMovies = ({ children }: Props) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      padding={5}
      spacing={6}
    >
      {children}
    </SimpleGrid>
  );
};

export default GridMovies;
