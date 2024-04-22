export const searchProductExist = (
  product: IProduct,
  productsList: IProdcutCart[]
) => {
  const productIdxExist = productsList.findIndex(
    (prod) => prod.id === product.id
  );

  if (productIdxExist >= 0) {
    const productExist = productsList[productIdxExist];
    productExist.quantity = productExist.quantity + 1;
    productsList[productIdxExist] = productExist;

    return {
      isExist: true,
      productsList,
    };
  }
};

export const renderImg = (product: IProduct): string => {
  return product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail
    ?.url;
};
