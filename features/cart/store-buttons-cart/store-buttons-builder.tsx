import { StoreItem } from './store-product-hook';
import { Typography } from '@mui/material';
import { CartProductI } from '@graphql/types';
import { FC } from 'react';
import { ProductsI } from '@features/products/types';
interface StoreButtonsBuilderProps {
  product: CartProductI | ProductsI;
}

interface PlusButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  plusProduct: () => void;
}
interface MinusButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  minusProduct: () => void;
}
interface ButtonAddProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addProduct: () => void;
}
interface InCartContainerProps {
  children: React.ReactNode;
  // Other prop types for InCartContainer
}
interface AddContainer {
  children: React.ReactNode;
}

export function StoreButtonsBuilder({
  MinusButton,
  PlusButton,
  ButtonAdd,
  InCartContainer,
  AddContainer,
}: {
  MinusButton: FC<MinusButtonProps>;
  PlusButton: FC<PlusButtonProps>;
  ButtonAdd: FC<ButtonAddProps>;
  InCartContainer: FC<InCartContainerProps>;
  AddContainer: FC<AddContainer>;
}) {
  return function StoreButtonsBuilder(props: StoreButtonsBuilderProps) {
    const { product } = props;
    const { addProduct, minusProduct, plusProduct, isInCart, quantity } =
      StoreItem({
        product,
      });
    return (
      <>
        {isInCart ? (
          <InCartContainer>
            <MinusButton minusProduct={minusProduct} />
            <Typography>{quantity}</Typography>
            <PlusButton plusProduct={plusProduct} />
          </InCartContainer>
        ) : (
          <AddContainer>
            <ButtonAdd
              aria-label="Add product"
              id="Agregar producto"
              addProduct={addProduct}
            />
          </AddContainer>
        )}
      </>
    );
  };
}
