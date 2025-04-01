import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import GenreList from "../Components/GenreList";
import GridMain from "../Components/GridMain";
import Sort from "../Components/Sort";
import GenList from "../Components/GenList";

const HomePage = () => (
  <Grid
    templateAreas={{
      base: ` "main"`,
      lg: ` "aside main"`,
    }}
  >
    <Show above="lg">{/* <GenreList /> */}</Show>
    <Show below="lg"></Show>
    <GridItem area={"main"} boxSize={{ base: 400, md: 800, lg: 1200 }}>
      <HStack paddingX={10}>
        <GenList />
        <Sort />
      </HStack>
      <GridMain />
      <HStack paddingX={10}></HStack>
    </GridItem>
  </Grid>
);

export default HomePage;
