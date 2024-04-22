import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

const GridLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(auto-fit, minmax(18.75rem, 1fr))",
        lg: "repeat(4, 1fr)",
      }}
      mt={"1rem"}
      gap={6}
    >
      {children}
    </Grid>
  );
};

export default GridLayout;
