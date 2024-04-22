import { Card, Skeleton, Stack } from "@chakra-ui/react";

const SproductDetailsCard = () => {
  return (
    <Card flexGrow={1} border="1px solid #9e576e" p={"1rem"} bg={"transparent"}>
      <Stack spacing={"1rem"}>
        <Skeleton mx={"auto"} width={"95%"} height="10rem" />
        <Skeleton mx={"auto"} width={"10rem"} height="2rem" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton mx={"auto"} my={"1rem"} width={"8rem"} height="20px" />
        <Skeleton mx={"auto"} width={"full"} height="3rem" />
      </Stack>
    </Card>
  );
};

export default SproductDetailsCard;
