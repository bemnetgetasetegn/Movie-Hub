import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";
import GridMain from "./Components/GridMain";
import GenreList from "./Components/GenreList";
import { useState } from "react";
import { Genre } from "./assets/hooks/useGenre";
import Sort from "./Components/Sort";
import Page from "./Components/Page";

export interface MovieQuery {
  genre: Genre | null;
  sort: string;
  search: string;
}

const App = () => {
  const [page, setPage] = useState(1);
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
        <GenreList
          selectedGenre={MovieQuery.genre}
          onSelectedGenre={(genre) =>
            setMovieQuery({ ...MovieQuery, genre: genre })
          }
        />
      </Show>
      <GridItem area={"main"}>
        <HStack paddingX={10}>
          <Sort
            sortOrder={MovieQuery.sort}
            onSortOrders={(order) =>
              setMovieQuery({ ...MovieQuery, sort: order })
            }
          />
        </HStack>
        <GridMain page={page} movieQuery={MovieQuery} />
        <HStack paddingX={10}>
          <Page page={page} onChangePage={(page) => setPage(page)} />
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default App;
