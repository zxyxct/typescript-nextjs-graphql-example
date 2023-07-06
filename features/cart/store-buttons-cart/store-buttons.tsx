import { StoreButtonsBuilder } from './store-buttons-builder';
import { Button, Box } from '@mui/material';
import { useMemo } from 'react';
import { CartProductI } from '@graphql/types';

const StoreButtons = ({ product }: { product: CartProductI }) => {
  type MinusButtonProps = {
    minusProduct: () => void;
  };
  const MinusButton = useMemo(() => {
    const MinusButton = (props: MinusButtonProps) => {
      const { minusProduct } = props;
      return (
        <Button color="success" variant="outlined" onClick={minusProduct}>
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
          //    error();
        }
      };
      return (
        <Button color="success" variant="outlined" onClick={plusWithError}>
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
            ml: `2.5vw`,
            mr: `2.5vw`,
          }}
          onClick={() => addProduct()}
        >
          AGREGAR
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
        <Box sx={{ display: `flex`, flexDirection: `column-reverse` }}>
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
            height: `calc(7.5% + .35rem )`,
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
export default StoreButtons;
