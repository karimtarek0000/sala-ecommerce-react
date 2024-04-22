import { Button } from "@chakra-ui/react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();

  // ----------------- HANDLER -----------------
  const goBack = () => navigate(-1);

  return (
    <Button
      as={"button"}
      bg={"transparent"}
      display={"Flex"}
      alignItems={"center"}
      gap={"10px"}
      border={"none"}
      _hover={{ bg: "transparent" }}
      py={7}
      size="sm"
      textTransform={"uppercase"}
      onClick={goBack}
    >
      <IoArrowBackSharp transform="scale(1.3)" />
      back
    </Button>
  );
};

export default BackBtn;
