export interface ProductsI {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: rating
    stock: number  
  }

  type rating = {
     rate: number;
     count: number;
  }

 export interface ProductGridItemPropsI {
    readonly productDetailsHandle: (index: number) => void;
    product: ProductsI;
    index: number;
  }