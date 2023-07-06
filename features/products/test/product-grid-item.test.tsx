import { fireEvent, render, screen } from '@testing-library/react';
import { ProductGridItem } from '../product-grid-item';

describe('renders product-grid-card', () => {
  const product = {
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
  };
  const productDetailsHandle = () => {};
  beforeEach(() => {
    render(
      <ProductGridItem
        product={product}
        productDetailsHandle={productDetailsHandle}
        index={1}
      />
    );
  });
  it('item-card shows the info about the product', () => {
    // jest.mock(item)
    const productName = screen.getByText(`${product.title}`);
    const productPrice = screen.getByText(`$ ${product.price}`);
    const buttonInitial = screen.getByRole('button', { name: `ADD PRODUCT` });
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(buttonInitial).toBeInTheDocument();
  });

  it("button on item card changes from initial state ('ADD PRODUCT') to 1 on user click", async () => {
    const buttonInitial = screen.getByRole('button', { name: `ADD PRODUCT` });
    fireEvent.click(buttonInitial);
    const productAdded = screen.findByText('1');
    expect(await productAdded).toBeInTheDocument();
  });

  it('button on item card changes from 1 to 2 on user click', async () => {
    const buttonPlus = screen.getByRole('button', { name: `+` });
    fireEvent.click(buttonPlus);
    const quantity = screen.findByText('2');
    expect(await quantity).toBeInTheDocument();
  });

  it('button on item card changes from 2 to ADD PRODUCT on  2 user clicks', async () => {
    const buttonMinus = screen.getByRole('button', { name: `-` });
    fireEvent.click(buttonMinus);
    fireEvent.click(buttonMinus);
    const productDeleted = screen.findByText('ADD PRODUCT');
    expect(await productDeleted).toBeInTheDocument();
  });
});
