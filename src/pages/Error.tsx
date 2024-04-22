import { Text, VStack } from "@chakra-ui/react";
import RenderSVG from "@components/ui/RenderSVG";
import useBreakPoints from "@hooks/useBreakPoints";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const brekPointsForRenderSVG = useBreakPoints();

  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 500;
    errorStatusText = "Error";
  }

  return (
    <VStack height={"100vh"} justifyContent={"center"}>
      <RenderSVG name="error" size={brekPointsForRenderSVG() || "40rem"} />
      <Text fontSize={"2rem"}>{errorStatus}</Text>
      <Text fontSize={{ base: "1rem", md: "2rem" }}>{errorStatusText}</Text>
    </VStack>
  );
}

export default Error;
