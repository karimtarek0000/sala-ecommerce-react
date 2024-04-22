import { Image, Td, Tr } from "@chakra-ui/react";
import { renderImg } from "@utils/index";
import { ReactNode } from "react";

function TableRow({ prod, children }: { prod: IProduct; children: ReactNode }) {
  return (
    <Tr>
      <Td>{prod?.id}</Td>
      <Td>{prod?.attributes?.title}</Td>
      <Td>{prod?.attributes?.price}</Td>
      <Td>{prod?.attributes?.stock}</Td>
      <Td>
        <Image
          src={renderImg(prod)}
          alt={prod?.attributes?.title}
          boxSize="70px"
          rounded="full"
          objectFit="cover"
        />
      </Td>
      <Td>{children}</Td>
    </Tr>
  );
}

export default TableRow;
