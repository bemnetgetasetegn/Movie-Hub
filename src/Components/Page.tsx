import { Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    onChangePage: (page: number) => void;
    page: number;
}

const Page = ({onChangePage, page}: Props) => {
 

  return (
    <HStack spacing={5}>
      <Button onClick={() => onChangePage(page > 1 ? page - 1 : page)}>
        Previous
      </Button>
      <Button onClick={() => onChangePage(page + 1)}>Next</Button>
    </HStack>
  );
};

export default Page;
