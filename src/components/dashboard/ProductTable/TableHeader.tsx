import { Th, Thead, Tr } from "@chakra-ui/react";

function TableHeader() {
  return (
    <Thead>
      <Tr textAlign={"center"}>
        <Th>Id</Th>
        <Th>Title</Th>
        <Th>Price</Th>
        <Th>Stock</Th>
        <Th>Thumbnail</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
  );
}

export default TableHeader;
