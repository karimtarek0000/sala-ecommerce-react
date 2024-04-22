import { useBreakpoint } from "@chakra-ui/react";

function useBreakPoints() {
  const breakPoint = useBreakpoint();

  const brekPointsForRenderSVG = () => {
    switch (breakPoint) {
      case "base":
        return "13rem";
      case "sm":
        return "20rem";
      default:
        return false;
    }
  };

  return brekPointsForRenderSVG;
}

export default useBreakPoints;
