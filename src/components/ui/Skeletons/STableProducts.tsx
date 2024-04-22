import { Flex, HStack, Skeleton } from "@chakra-ui/react";

function STableProducts() {
  return (
    <Flex
      maxWidth="85%"
      mx={"auto"}
      flexGrow={1}
      alignItems={"center"}
      gap={20}
      borderBottom="1px solid #2f3547"
      p={"1rem"}
    >
      <Skeleton flexGrow={1} height="1rem" />
      <Skeleton flexGrow={1} height="1rem" />
      <Skeleton flexGrow={1} height="1rem" />
      <HStack>
        <Skeleton width={"100px"} height="2rem" />
        <Skeleton width={"100px"} height="2rem" />
      </HStack>
    </Flex>
  );
}

export default STableProducts;
