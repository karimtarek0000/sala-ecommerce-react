import { Button, HStack } from "@chakra-ui/react";
import { BiShow } from "react-icons/bi";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

function TableProductsActions(props: ITableProductsActions) {
  const { id, openDeleteModal, openModal } = props;

  return (
    <HStack gap={"1rem"}>
      {/* Go to product in the site */}
      <Button
        title="Go to link"
        as={RouterLink}
        to={`/product-details/${id}`}
        target="_blank"
      >
        <BiShow />
      </Button>

      {/* Delete a Product */}
      <Button title="Delete a product" onClick={openDeleteModal}>
        <MdDelete />
      </Button>

      {/* Edit a Product */}
      <Button title="Edit a product" onClick={openModal}>
        <MdModeEdit />
      </Button>
    </HStack>
  );
}

export default TableProductsActions;
