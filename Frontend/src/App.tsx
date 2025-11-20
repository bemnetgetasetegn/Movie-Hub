import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import GenreList from "./Components/GenreList";
import GridMain from "./Components/GridMain";
import NavBar from "./Components/NavBar";
import Sort from "./Components/Sort";

const App = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GenreList />
      </Show>
      <GridItem area={"main"}>
        <HStack paddingX={10}>
          <Sort />
        </HStack>
        <GridMain />
        <HStack paddingX={10}></HStack>
      </GridItem>
    </Grid>
  );
};

export default App;
