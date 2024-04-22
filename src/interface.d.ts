declare global {
  interface ILogin {
    identifier: string;
    password: string;
  }
  interface IUser {
    id: number;
    username: string;
    email: string;
  }
  interface IUserData {
    jwt: string;
    user: IUser;
  }
  interface IMage {
    data: {
      id: number;
      attributes: {
        name: string;
        formats: {
          thumbnail: {
            url: string;
          };
        };
      };
    };
  }
  interface ICategory {
    data: {
      id: number;
      attributes: {
        title: string;
      };
    };
  }
  interface IProduct {
    id: number;
    attributes: {
      title: string;
      description: string;
      price: number;
      stock: number;
      thumbnail: IMage;
      category: ICategory;
    };
  }
  interface IProdcutCart extends IProduct {
    quantity: number;
  }
  interface IError {
    error: {
      message: string;
    };
  }
  interface IAlertModal {
    title: string;
    subTitle: JSX.Element;
    btnSubmitTitle: string;
    btnDenyTitle: string;
    isLoading?: boolean;
    onSubmit: () => void;
  }
  interface IModalControle {
    title: string;
    children: ReactNode;
    whenClose: () => void;
  }
  interface ITableProductsActions {
    id: number;
    openDeleteModal: () => void;
    openModal: () => void;
  }
  interface IProductForForm {
    id?: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: string;
    thumbnailObj?: File;
  }
  interface IAddOrEditProductModal {
    product: IProductForForm;
    closeModal: () => void;
  }
  interface IProductsList {
    data: IProduct[];
    isLoading: boolean;
    isError: boolean;
    error: string;
  }
}

export {};
