import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";
import GridMain from "./Components/GridMain";
import GenreList from "./Components/GenreList";
import { useState } from "react";
import { Genre } from "./assets/hooks/useGenre";
import Sort from "./Components/Sort";
import Page from "./Components/Page";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [sortOrder, setSelectedOrder] = useState<string>("");
  const [page, setPage] = useState(1);

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
        <GenreList
          selectedGenre={selectedGenre}
          onSelectedGenre={(genre) => setSelectedGenre(genre)}
        />
      </Show>
      <GridItem area={"main"}>
        <HStack paddingX={10}>
          <Sort
            sortOrder={sortOrder}
            onSortOrders={(order) => setSelectedOrder(order)}
          />
        </HStack>
        <GridMain
          page={page}
          sortOrder={sortOrder}
          selectedGenre={selectedGenre}
        />
        <HStack paddingX={10}>
          <Page page={page} onChangePage={(page) => setPage(page)} />
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default App;
