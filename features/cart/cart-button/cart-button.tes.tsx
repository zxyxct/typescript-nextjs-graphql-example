import { render, screen } from '@testing-library/react';
import { CartButton } from './cart-button.jsx';
import { StoreButtonsBuilder } from '../store-buttons-cart/store-buttons-builder.jsx';
import { Button, Box } from '@mui/material';
import { CartProductI } from '@graphql/types.jsx';

describe('Test the CartButton in the initial state', () => {
  beforeEach(() => {
    render(<CartButton />, {
      container: document.createElement('div'),
    });
  });

  it('Fixed CartButton should show the sum of the total of all the products in the CartItemsVar multiplied by the quantity', () => {
    let total = '0';
    expect(screen.getByText(`$${total}`)).toBeInTheDocument();
  });

  it('Fixed CartButton should show the total of different items that are in the CartItemsVar', () => {
    let qty = '0';
    expect(screen.getByText(`(${qty}) items`)).toBeInTheDocument();
  });
});

type MinusButtonProps = {
  minusProduct: () => void;
};
describe('CartButton when user interact with the Buttons that are used at the product', () => {
  const MinusButton = (props: MinusButtonProps) => {
    const { minusProduct } = props;
    return (
      <Button
        color="primary"
        variant="contained"
        onClick={minusProduct}
        sx={{ minHeight: `100%` }}
      >
        -{' '}
      </Button>
    );
  };
  type PlusButtonProps = {
    plusProduct: () => void;
  };
  const PlusButton = (props: PlusButtonProps) => {
    const { plusProduct } = props;
    return (
      <Button color="primary" variant="contained" onClick={plusProduct}>
        +{' '}
      </Button>
    );
  };
  type ButtonAddProps = {
    addProduct: () => void;
  };
  const ButtonAdd = (props: ButtonAddProps) => {
    const { addProduct } = props;
    return (
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'primary.darker',
          width: `80%`,
          margin: `auto`,
        }}
        onClick={() => addProduct()}
      >
        {' '}
        AGREGAR{' '}
      </Button>
    );
  };
  type InCartContainerProps = {
    children: React.ReactNode;
  };
  const InCartContainer = (props: InCartContainerProps) => {
    return <>{props.children}</>;
  };
  type AddContainerProps = {
    children: React.ReactNode;
  };
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

  const HOCButtons = StoreButtonsBuilder({
    MinusButton,
    PlusButton,
    ButtonAdd,
    InCartContainer,
    AddContainer,
  });
  const product: CartProductI = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
    stock: 5,
    quantity: 1,
  };

  beforeEach(() => {
    render(<CartButton />, {
      container: document.createElement('div'),
    });
  });

  beforeEach(() => {
    render(<HOCButtons product={product} />);
  });

  //  it("Fixed CartButton should open the modal that shows the cart items when clicking on it", () => {});

  it('Fixed CartButton should show the sum of the total of all the products in the CartItemsVar multiplied by the quantity', () => {
    let total = '0';
    expect(screen.getByText(`$${total}`)).toBeInTheDocument();
  });

  it('Fixed CartButton should show the total of different items that are in the CartItemsVar', () => {
    let qty = '0';
    expect(screen.getByText(`(${qty}) items`)).toBeInTheDocument();
  });
});
