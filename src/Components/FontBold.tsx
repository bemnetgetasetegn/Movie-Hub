import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FontBold = ({ children }: Props) => {
  return <Text fontWeight={"bold"}>{children}</Text>;
};

export default FontBold;
