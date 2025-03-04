import { Badge } from "@chakra-ui/react";

interface Props {
  rating: number;
}
const VoteAverage = ({ rating }: Props) => {
  let color = rating > 8 ? "green" : rating > 5 ? "yellow" : "red";
  return (
    <>
      <Badge
        fontSize={"14px"}
        paddingX={2}
        borderRadius="4px"
        colorScheme={color}
      >
        {rating}
      </Badge>
    </>
  );
};

export default VoteAverage;
