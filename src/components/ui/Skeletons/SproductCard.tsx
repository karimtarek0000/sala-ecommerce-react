import { Card, Stack, SkeletonCircle, Skeleton } from "@chakra-ui/react";

const SproductCard = () => {
  return (
    <Card flexGrow={1} border="1px solid #9e576e" p={"1rem"} bg={"transparent"}>
      <Stack spacing={"1rem"}>
        <SkeletonCircle mx={"auto"} size="40" />
        <Skeleton mx={"auto"} width={"10rem"} height="2rem" />
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

export default SproductCard;
