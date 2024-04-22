import { Button, HStack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IPagination {
  page: number;
  pageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}
function Pagination(props: IPagination) {
  const { page, setPage, pageCount } = props;

  // ----------------- HANDLER -----------------
  const nextPageHandler = () => setPage((prev) => prev + 1);
  const prevPageHandler = () => setPage((prev) => prev - 1);

  return (
    <HStack justifyContent={"center"} my={"50px"} fontSize={"60px"}>
      <Button
        onClick={prevPageHandler}
        isDisabled={page === 1}
        py={"30px"}
        px={"40px"}
      >
        <IoIosArrowBack />
        <Text ms={"5px"}>Prev</Text>
      </Button>
      <Text fontSize={"1rem"}>
        {page} of {pageCount}
      </Text>
      <Button
        onClick={nextPageHandler}
        isDisabled={page === pageCount}
        py={"30px"}
        px={"40px"}
      >
        <Text me={"5px"}>Next</Text>
        <IoIosArrowForward />
      </Button>
    </HStack>
  );
}

export default Pagination;
