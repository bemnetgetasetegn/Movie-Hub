import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useMoviesStore from "../store";

const Sort = () => {
  const sortOrder = useMoviesStore((s) => s.movieQuery.sort);
  const setSortOrder = useMoviesStore((s) => s.setSort);

  const sortOrders = [
    { value: "", label: "Popularity" },
    { value: "-added", label: "Date Added" },
    { value: "original_title.desc", label: "Name" },
    { value: "primary_release_date.desc", label: "Release Date" },
    { value: "vote_count.desc", label: "Vote Count" },
  ];
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      <MenuButton as={Button}>
        Order By: {currentSortOrder?.label || "Popularity"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            key={order.value}
            value={order.value}
            onClick={() => setSortOrder(order.value)}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Sort;
