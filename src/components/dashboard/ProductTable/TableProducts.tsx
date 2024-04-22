import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import AddOrEditProductModal from "@components/dashboard/Modals/AddOrEditProductModal";
import TableHeader from "@components/dashboard/ProductTable/TableHeader";
import TableProductsActions from "@components/dashboard/ProductTable/TableProductsActions";
import TableRow from "@components/dashboard/ProductTable/TableRow";
import GridList from "@components/layout/GridList";
import AlertModal from "@components/ui/AlertModal";
import ModalControle from "@components/ui/ModalControle";
import NoProducts from "@components/ui/NoProducts";
import { initProduct } from "@constans/index";
import { useDeleteProductDashboardMutation } from "@store/services/productSlice";
import { renderImg } from "@utils/index";
import { useEffect, useRef, useState } from "react";

function TableProducts({ products }: { products: IProduct[] }) {
  // ----------------- REFS -----------------
  const alertModalDeleteRef = useRef<any>(null);
  const modalControleRef = useRef<any>(null);

  // ----------------- STATE -----------------
  const [product, setProduct] = useState<IProductForForm>(initProduct);
  const [productForDelete, setProductForDelete] = useState<IProduct>(
    {} as IProduct
  );

  // ----------------- HOOKS -----------------
  const [deleteProduct, { isLoading, isSuccess, isError, error }] =
    useDeleteProductDashboardMutation();
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: `${error}`,
        status: "error",
        position: "top",
      });
    }

    if (isSuccess) {
      alertModalDeleteRef.current?.close();
      toast({
        title: `Has been deleted ${productForDelete?.attributes?.title} successfully`,
        status: "success",
        position: "top",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess, toast]);

  // ----------------- HANDLER -----------------
  const openAlertModalHandler = (product: IProduct): void => {
    alertModalDeleteRef.current.open();
    setProductForDelete(product);
  };
  const openModalHandler = () => modalControleRef.current.open();
  const resetProductState = () => setProduct(initProduct);
  const closeModalHandler = () => modalControleRef.current.close();
  const openModalFormProductHandler = (product: IProduct): void => {
    openModalHandler();
    setProduct({
      id: product.id,
      title: product.attributes.title,
      description: product.attributes.description,
      price: product.attributes.price,
      stock: product.attributes.stock,
      thumbnail: renderImg(product),
    });
  };

  return (
    <VStack
      alignItems={{ base: "center", md: "end" }}
      maxWidth="85%"
      mx={"auto"}
      gap={"2rem"}
    >
      <Button
        bg={"#9F7AEA"}
        py={"25px"}
        _hover={{
          bg: "#9d77ecc4",
        }}
        onClick={openModalHandler}
      >
        Add new Product
      </Button>

      <TableContainer width={"100%"} mx={"auto"}>
        {products.length ? (
          <Table variant="simple">
            <TableHeader />

            <Tbody>
              <GridList
                records={products as []}
                renderComp={(prod: IProduct) => (
                  <TableRow prod={prod}>
                    <TableProductsActions
                      id={prod.id}
                      openDeleteModal={() => openAlertModalHandler(prod)}
                      openModal={() => openModalFormProductHandler(prod)}
                    />
                  </TableRow>
                )}
              />
            </Tbody>
          </Table>
        ) : (
          <NoProducts />
        )}

        {/* Alert modal */}
        <AlertModal
          ref={alertModalDeleteRef}
          title="Delete Product"
          subTitle={
            <Text as={"p"}>
              Are you sure want delete a product:{" "}
              <Text as={"span"} fontWeight={"900"}>
                {productForDelete?.attributes?.title}
              </Text>{" "}
              from database
            </Text>
          }
          btnDenyTitle="Cancel"
          btnSubmitTitle="Remove"
          isLoading={isLoading}
          onSubmit={() => deleteProduct(productForDelete.id)}
        />

        {/* Modal for edit and added new product */}
        <ModalControle
          ref={modalControleRef}
          whenClose={resetProductState}
          title={`${
            product.id ? `Edit ${product.title} Product` : "Add new Product"
          }`}
        >
          <AddOrEditProductModal
            product={product}
            closeModal={closeModalHandler}
          />
        </ModalControle>
      </TableContainer>
    </VStack>
  );
}

export default TableProducts;
