import { Button, Text, VStack } from "@chakra-ui/react";
import RenderSVG from "@components/ui/RenderSVG";
import useBreakPoints from "@hooks/useBreakPoints";
import { Link as RouterLink } from "react-router-dom";

function NotFound() {
  const brekPointsForRenderSVG = useBreakPoints();

  return (
    <VStack overflow={"hidden"} justifyContent={"center"} minHeight={"100vh"}>
      <RenderSVG name="404" size={brekPointsForRenderSVG() || "40rem"} />

      <VStack gap={"1rem"}>
        <Text fontSize={"2rem"}>Page not found</Text>
        <Button
          as={RouterLink}
          to="/"
          replace
          bg={"#9F7AEA"}
          _hover={{
            bg: "#9d77ecc4",
          }}
        >
          Go to Home
        </Button>
      </VStack>
    </VStack>
  );
}

export default NotFound;
