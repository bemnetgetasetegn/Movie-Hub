import { Grid, GridItem, HStack } from "@chakra-ui/react";
import GenList from "../Components/GenList";
import GridMain from "../Components/GridMain";
import Sort from "../Components/Sort";

const HomePage = () => (
  <Grid
    templateAreas={{
      base: ` "main"`,
      lg: ` "aside main"`,
    }}
  >
    <GridItem area={"main"} boxSize={{ base: 400, md: 800, lg: 1200 }}>
      <HStack paddingX={10}>
        <GenList />
        <Sort />
      </HStack>
      <HStack paddingX={10}></HStack>
      <GridMain />
    </GridItem>
  </Grid>
);

export default HomePage;
