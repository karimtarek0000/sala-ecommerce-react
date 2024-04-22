import { Image, Text, VStack } from "@chakra-ui/react";
import noproducts from "/noproducts.webp";
function NoProducts() {
  return (
    <VStack alignSelf={"center"} height={"60vh"} placeContent={"center"}>
      <Image
        pointerEvents={"none"}
        userSelect={"none"}
        src={noproducts}
        alt="no any products"
      />
      <Text as="h3" fontSize={{ base: "1rem", md: "2rem" }}>
        No any products yet
      </Text>
    </VStack>
  );
}

export default NoProducts;
