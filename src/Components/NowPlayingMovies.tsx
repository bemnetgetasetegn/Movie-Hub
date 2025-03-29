import { Card, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

const NowPlayingMovies = ({ title, children }: Props) => {
  return (
    <>
      <Heading>{title}</Heading>
      <Card>{children}</Card>
    </>
  );
};

export default NowPlayingMovies;
