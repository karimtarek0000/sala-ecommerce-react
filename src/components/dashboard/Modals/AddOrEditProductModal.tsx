import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import FileInput from "@components/ui/FileInput";
import ImagePreview from "@components/ui/ImagePreview";
import {
  useAddProductDashboardMutation,
  useUpdateProductDashboardMutation,
} from "@store/services/productSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const AddOrEditProductModal = (props: IAddOrEditProductModal) => {
  const { product, closeModal } = props;

  // ----------------- STATE -----------------
  const [prod, setProduct] = useState<IProductForForm>(product);
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    thumbnail: "",
  });
  const { id, title, description, price, stock, thumbnail } = prod;
  const toast = useToast();

  // ----------------- API -----------------
  const [
    updateProduct,
    {
      isLoading: isLoadingUpdateProduct,
      isError: isErrorUpdateProduct,
      error: errorUpdateProduct,
      isSuccess: isSuccessUpdateProduct,
    },
  ] = useUpdateProductDashboardMutation();
  const [
    addNewProduct,
    {
      isLoading: isLoadingAddProduct,
      isError: isErrorAddProduct,
      error: errorAddProduct,
      isSuccess: isSuccessAddProduct,
    },
  ] = useAddProductDashboardMutation();

  // ----------------- HANDLER -----------------
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  const onChangeHandlerForStock = (value: string) => {
    setProduct((prev) => ({ ...prev, stock: +value }));
  };
  const onChangeHandlerForPrice = (value: string) => {
    setProduct((prev) => ({ ...prev, price: +value }));
  };
  const deleteThumbnailHandler = () => {
    setProduct((prev) => ({ ...prev, thumbnail: "" }));
  };

  // ----------------- VALIDATIONS -----------------
  const validationOnTitle = () => {
    let message = "";

    if (!title) message = "Title is required";
    if (title && title.length < 5) message = "At least 5 letters";

    setFormErrors((prev) => ({ ...prev, title: message }));
    return message ? false : true;
  };
  const validationOnDescription = () => {
    let message = "";

    if (!description) message = "Description is required";
    if (description && description.length < 10) message = "At least 10 letters";

    setFormErrors((prev) => ({ ...prev, description: message }));
    return message ? false : true;
  };
  const validationOnThumbnail = () => {
    let message = "";

    if (!thumbnail) message = "Thumbnail is required";

    setFormErrors((prev) => ({ ...prev, thumbnail: message }));
    return message ? false : true;
  };
  const validationOnPrice = () => {
    let message = "";

    if (!price) message = "Price is required";

    setFormErrors((prev) => ({ ...prev, price: message }));
    return message ? false : true;
  };
  const validationOnStock = () => {
    let message = "";

    if (!stock) message = "Stock is required";

    setFormErrors((prev) => ({ ...prev, stock: message }));
    return message ? false : true;
  };
  const validationsCombine = (name: keyof IProductForForm) => {
    const errors: {
      [key in keyof IProductForForm]: () => boolean;
    } = {
      title: validationOnTitle,
      description: validationOnDescription,
      thumbnail: validationOnThumbnail,
      price: validationOnPrice,
      stock: validationOnStock,
    };

    if (errors[name] && typeof errors[name] === "function") {
      return errors[name]!();
    }
  };

  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const isValid = [
      validationsCombine("title"),
      validationsCombine("description"),
      validationsCombine("thumbnail"),
      validationsCombine("price"),
      validationsCombine("stock"),
    ].every((status) => status);

    if (isValid) {
      const body = new FormData();
      body.append(
        "data",
        JSON.stringify({
          title: prod.title,
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
        })
      );
      if (prod.thumbnailObj) body.append("files.thumbnail", prod.thumbnailObj);

      prod.id ? updateProduct({ id, body }) : addNewProduct({ body });
    }
  };

  // ----------------- HOOKS -----------------
  useEffect(() => {
    if (isSuccessUpdateProduct || isSuccessAddProduct) closeModal();
    if (isSuccessUpdateProduct) {
      toast({
        title: "Product updated successfully",
        status: "success",
        position: "top",
      });
    }
    if (isSuccessAddProduct) {
      toast({
        title: "Product added successfully",
        status: "success",
        position: "top",
      });
    }
    if (isErrorUpdateProduct || isErrorAddProduct) {
      toast({
        title: `${errorUpdateProduct || errorAddProduct}`,
        status: "error",
        position: "top",
      });
    }
  }, [
    closeModal,
    errorAddProduct,
    errorUpdateProduct,
    isErrorAddProduct,
    isErrorUpdateProduct,
    isSuccessAddProduct,
    isSuccessUpdateProduct,
    toast,
  ]);

  return (
    <Box as="form" onSubmit={onSubmitHandler} pb={"10px"}>
      {/* Title */}
      <FormControl mb={"1.2rem"}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          value={title}
          onChange={onChangeHandler}
          name="title"
          autoFocus
          placeholder="Enter title product"
        />
        {formErrors.title && (
          <FormHelperText>{formErrors.title}</FormHelperText>
        )}
      </FormControl>

      {/* Price */}
      <FormControl mb={"1.2rem"}>
        <FormLabel htmlFor="price">Price</FormLabel>
        <NumberInput
          id="price"
          value={`${price}`}
          onChange={onChangeHandlerForPrice}
          name="price"
          min={0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {formErrors.price && (
          <FormHelperText>{formErrors.price}</FormHelperText>
        )}
      </FormControl>

      {/* Stock */}
      <FormControl mb={"1.2rem"}>
        <FormLabel htmlFor="stock">Stock</FormLabel>
        <NumberInput
          id="stock"
          value={stock}
          onChange={onChangeHandlerForStock}
          name="stock"
          min={0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {formErrors.stock && (
          <FormHelperText>{formErrors.stock}</FormHelperText>
        )}
      </FormControl>

      {/* Description */}
      <FormControl mb={"1.2rem"}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          rows={5}
          resize={"none"}
          id="description"
          value={description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter description product"
        />
        {formErrors.description && (
          <FormHelperText>{formErrors.description}</FormHelperText>
        )}
      </FormControl>

      {/* Thumbnail */}
      <FileInput
        py={"10px"}
        label="Thumbnail"
        errorMessage={formErrors.thumbnail}
        fileExist={!!prod.thumbnail}
        setFile={(img) =>
          setProduct((prev) => ({
            ...prev,
            thumbnail: URL.createObjectURL(img),
            thumbnailObj: img,
          }))
        }
      />

      {/* Thumbnail preview */}
      <ImagePreview
        src={thumbnail}
        alt="thumbnail your selected"
        imgExist={!!thumbnail}
        label="Thumbnail"
        height={"100%"}
        width={"100%"}
        maxHeight={"100%"}
        objectFit="cover"
      >
        <Button
          title="Delete thumbnail"
          ms={"auto"}
          onClick={deleteThumbnailHandler}
        >
          <IoCloseSharp />
        </Button>
      </ImagePreview>

      {/* Actions */}
      <HStack mt={"1rem"} justifyContent={"center"}>
        <Button
          outline={"1px solid #e0dce961"}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoadingUpdateProduct || isLoadingAddProduct}
          bg={"#9F7AEA"}
          _hover={{ bg: "#9d77ecc4" }}
          type="submit"
        >
          {prod.id ? "Update" : "Submit"}
        </Button>
      </HStack>
    </Box>
  );
};

export default AddOrEditProductModal;
