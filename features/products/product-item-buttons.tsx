import { useMemo } from 'react';
import { Button, Box } from '@mui/material';
import { StoreButtonsBuilder } from '@features/cart/store-buttons-cart/store-buttons-builder';
import { ProductsI } from './types';

export const ProductItemButtons = ({ product }: { product: ProductsI }) => {
  type MinusButtonProps = {
    minusProduct: () => void;
  };
  const MinusButton = useMemo(() => {
    const MinusButton = (props: MinusButtonProps) => {
      const { minusProduct } = props;
      return (
        <Button
          sx={{ height: `100%`, minWidth: '20%' }}
          color="primary"
          variant="contained"
          onClick={minusProduct}
        >
          -
        </Button>
      );
    };
    MinusButton.displayName = 'PlusButtonCart';
    return MinusButton;
  }, []);

  type PlusButtonProps = {
    plusProduct: () => void;
  };
  const PlusButton = useMemo(() => {
    const PlusButton = (props: PlusButtonProps) => {
      const { plusProduct } = props;
      // const { error } = UserErrors();
      const plusWithError = () => {
        try {
          plusProduct();
        } catch (e) {
          //     error();
        }
      };
      return (
        <Button
          sx={{ height: `100%`, minWidth: '20%' }}
          color="primary"
          variant="contained"
          onClick={plusWithError}
        >
          +
        </Button>
      );
    };
    PlusButton.displayName = 'PlusButtonCart';
    return PlusButton;
  }, []);

  type ButtonAddProps = {
    addProduct: () => void;
  };
  const ButtonAdd = useMemo(() => {
    const ButtonAdd = (props: ButtonAddProps) => {
      const { addProduct } = props;
      return (
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.darker',
            width: `100%`,
          }}
          onClick={() => addProduct()}
        >
          Add
        </Button>
      );
    };
    ButtonAdd.displayName = 'ButtonAddCart';
    return ButtonAdd;
  }, []);
  type InCartContainerProps = {
    children: React.ReactNode;
  };
  const InCartContainer = useMemo(() => {
    const InCartContainer = (props: InCartContainerProps) => {
      return (
        <Box
          sx={{
            width: `100%`,
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-evenly`,
            height: `calc(7.5% + .35rem )`,
            alignItems: `baseline`,
            mt: `.75rem`,
            mb: `.75rem`,
          }}
        >
          {props.children}
        </Box>
      );
    };
    InCartContainer.displayName = 'InCartContainerCart';
    return InCartContainer;
  }, []);

  type AddContainerProps = {
    children: React.ReactNode;
  };
  const AddContainer = useMemo(() => {
    const AddContainer = (props: AddContainerProps) => {
      return (
        <Box
          sx={{
            width: `75%`,
            display: `flex`,
            height: {
              xs: `calc(7.5% + 1.5rem )`,
              sm: `calc(7.5% + .35rem )`,
              md: `calc(7.5% + .35rem )`,
              lg: `calc(7.5% + .35rem )`,
            },
            margin: `.5rem auto .5rem auto`,
          }}
        >
          {props.children}
        </Box>
      );
    };
    AddContainer.displayName = 'AddContainerCart';
    return AddContainer;
  }, []);

  const HOCButtons = useMemo(
    function HOCButtons() {
      return StoreButtonsBuilder({
        MinusButton,
        PlusButton,
        ButtonAdd,
        InCartContainer,
        AddContainer,
      });
    },
    [MinusButton, PlusButton, ButtonAdd, InCartContainer, AddContainer]
  );
  return <HOCButtons product={product} />;
};
