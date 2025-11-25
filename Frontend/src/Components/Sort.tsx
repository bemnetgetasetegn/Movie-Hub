import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaSort } from "react-icons/fa";
import useMoviesStore from "../store";

const MotionButton = motion(Button);

interface Props {
  type?: 'movie' | 'tv';
}

const Sort = ({ type = 'movie' }: Props) => {
  const movieSortOrder = useMoviesStore((s) => s.movieQuery.sort);
  const tvSortOrder = useMoviesStore((s) => s.tvQuery.sort);
  const setMovieSort = useMoviesStore((s) => s.setMovieSort);
  const setTVSort = useMoviesStore((s) => s.setTVSort);

  const sortOrder = type === 'movie' ? movieSortOrder : tvSortOrder;
  const setSortOrder = type === 'movie' ? setMovieSort : setTVSort;

  const sortOrders = [
    { value: "", label: "Popularity" },
    { value: "first_air_date.desc", label: "Release Date" },
    { value: "name.desc", label: "Name" },
    { value: "vote_average.desc", label: "Vote Average" },
    { value: "vote_count.desc", label: "Vote Count" },
  ];
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Menu>
      <MenuButton
        as={MotionButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        leftIcon={<FaSort />}
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="full"
        px={6}
        py={3}
        shadow="md"
        _hover={{
          bg: useColorModeValue("blue.50", "blue.900"),
          borderColor: "blue.300",
          shadow: "lg",
        }}
        transition="all 0.2s"
      >
        Sort: {currentSortOrder?.label || "Popularity"}
      </MenuButton>
      <MenuList
        bg={bg}
        borderColor={borderColor}
        shadow="xl"
        borderRadius="lg"
      >
        {sortOrders.map((order) => (
          <MenuItem
            key={order.value}
            value={order.value}
            onClick={() => setSortOrder(order.value)}
            _hover={{
              bg: useColorModeValue("blue.50", "blue.900"),
              color: "blue.600",
            }}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Sort;
