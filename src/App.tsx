import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";
import GridMain from "./Components/GridMain";
import GenreList from "./Components/GenreList";
import { useState } from "react";
import { Genre } from "./assets/hooks/useGenre";
import Sort from "./Components/Sort";

export interface MovieQuery {
  genreId?: number;
  sort: string;
  search: string;
}

const App = () => {
  const [MovieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar
          onSearchinput={(text) =>
            setMovieQuery({ ...MovieQuery, search: text })
          }
        />
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
