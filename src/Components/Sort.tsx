import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

interface Props {
  onSortOrders: (order: string) => void;
  sortOrder: string;
}

const Sort = ({ onSortOrders, sortOrder }: Props) => {
  const sortOrders = [
    { value: "", label: "Popularity" },
    { value: "-added", label: "Date Added" },
    { value: "original_title.desc", label: "Name" },
    { value: "primary_release_date.desc", label: "Release Date" },
    { value: "vote_count.desc", label: "Vote Count" },
  ];
  const courrentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );
  
  return (
    <Menu>
      <MenuButton as={Button}>
        Order By: {courrentSortOrder?.label || "Popularity"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            key={order.value}
            value={order.value}
            onClick={() => onSortOrders(order.value)}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Sort;
