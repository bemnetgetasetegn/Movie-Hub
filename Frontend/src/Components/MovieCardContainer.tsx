import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MovieCardContainer = ({ children }: Props) => {
  const shadow = useColorModeValue("xl", "dark-xl");

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      shadow={shadow}
      sx={{
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
};

export default MovieCardContainer;
