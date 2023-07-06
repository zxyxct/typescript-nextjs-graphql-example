import { StoreItem } from './store-product-hook';
import { renderHook, act, RenderHookResult } from '@testing-library/react';
import { CartLocalStorageI } from '@graphql/types';

describe('useStoreItem HOOK', () => {
  type HookStateType = {
    addProduct: () => void;
    minusProduct: () => void;
    plusProduct: () => void;
    quantity: number | null;
    isInCart: boolean;
    cartItems: CartLocalStorageI;
  };

  var hookStates: RenderHookResult<unknown, HookStateType>;

  var product = {
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
  var product2 = {
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
  beforeEach(() => {
    hookStates = renderHook(() => StoreItem({ product }));
  });
  it('should return the initial state of CartItemsVar', () => {
    const {
      result: { current },
    } = hookStates;

    // Type assertion to specify the expected type of `current`
    const { cartItems } = current as HookStateType;
    expect(cartItems).toStrictEqual([]);
  });
  it('should update the localStorage equal to the cartItems', () => {});
  describe('useStoreItem HOOK => Method:addProduct', () => {
    it("method : addProduct , it should aggregate a product to the CartItemsVar when it's empty", async () => {
      const { result } = hookStates;
      const current = result.current as HookStateType;
      const spy = jest.spyOn(current, 'addProduct');
      const spyStorage = jest.spyOn(
        Object.getPrototypeOf(window.localStorage),
        'setItem'
      );
      const { addProduct } = result.current as HookStateType;
      await act(() => addProduct());
      var itemcart = {
        ...product,
        quantity: 1,
      };
      const { cartItems } = result.current as HookStateType;

      expect(cartItems).toStrictEqual([itemcart]);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyStorage).toHaveBeenCalledTimes(1);
      expect(spyStorage).toHaveBeenCalledWith(
        'items',
        JSON.stringify(cartItems)
      );

      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }

      expect(cartItems).toStrictEqual(localStorageValue);
    });
    it('method : addProduct, it should append a product to the CartItemsVar array when it already has any items on it', async () => {
      let secondStoreState = renderHook(() => StoreItem({ product: product2 }));
      const { result } = secondStoreState;
      const current = result.current as HookStateType;
      const spy = jest.spyOn(result.current, 'addProduct');
      const spyStorage = jest.spyOn(
        Object.getPrototypeOf(window.localStorage),
        'setItem'
      );

      const { addProduct } = result.current;

      act(() => addProduct());

      var itemcart1 = {
        ...product,
        quantity: 1,
      };
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };

      expect(current.cartItems).toStrictEqual([itemcart1, itemcart2]);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyStorage).toHaveBeenCalledTimes(2);
      expect(spyStorage).toHaveBeenCalledWith(
        'items',
        JSON.stringify(current.cartItems)
      );
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }

      expect(current.cartItems).toStrictEqual(localStorageValue);
    });

    it("method: addProduct, it shouldn't add a product that already exist in the cart", async () => {
      var product3 = {
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
      let thirdStoreState = renderHook(() => StoreItem({ product: product3 }));

      const { result } = thirdStoreState;
      const current = result.current as HookStateType;

      const cartBeforeAdd = current.cartItems;

      const spy = jest.spyOn(current, 'addProduct');
      const spyStorage = jest.spyOn(
        Object.getPrototypeOf(window.localStorage),
        'setItem'
      );
      const { addProduct } = current;
      act(() => addProduct());

      expect(current.isInCart).toBeTruthy();
      expect(current.cartItems).toStrictEqual(cartBeforeAdd);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyStorage).toHaveBeenCalledTimes(2);
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }

      expect(current.cartItems).toStrictEqual(localStorageValue);
    });
  });

  describe('useStoreItem HOOK => Method:plusProduct', () => {
    it('method: plusProduct,  it should increment by 1 the current quantity of the product', async () => {
      const { result } = hookStates;
      const current = result.current as HookStateType;

      const spy = jest.spyOn(current, 'plusProduct');

      await act(() => current.plusProduct());
      var itemcart1 = {
        ...product,
        quantity: 2,
      };
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };
      const { cartItems } = result.current as HookStateType;

      expect(spy).toHaveBeenCalledTimes(1);
      expect(cartItems).toStrictEqual([itemcart1, itemcart2]);
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }

      expect(cartItems).toStrictEqual(localStorageValue);
      spy.mockReset();
      spy.mockRestore();
    });

    it('method: plusProduct,  it wont increment the current quantity more than the stock available', async () => {
      jest.clearAllMocks();
      const stock = 10000;
      const { result } = hookStates;
      const current = result.current as HookStateType;

      for (let i = 0; i <= stock + 13; i++) {
        await act(async function () {
          return await current.plusProduct();
        });
      }
      var itemcart1 = {
        ...product,
        quantity: 10000,
      };
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };
      const { cartItems } = result.current as HookStateType;
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }
      expect(cartItems).toStrictEqual([itemcart1, itemcart2]);
      expect(cartItems).toStrictEqual(localStorageValue);
    });

    it('method: plusProduct,  it wont increment the current quantity more than 10000', async () => {
      jest.clearAllMocks();
      const { result } = hookStates;
      const current = result.current as HookStateType;

      for (let i = 0; i <= 10000; i++) {
        await act(function () {
          return current.plusProduct();
        });
      }
      var itemcart1 = {
        ...product,
        quantity: 10000,
      };
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };
      const { cartItems } = result.current as HookStateType;
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }
      expect(cartItems).toStrictEqual([itemcart1, itemcart2]);
      expect(cartItems).toStrictEqual(localStorageValue);
    });

    it('method: plusProduct, it should throw an error if the product that is trying to increase the quantity is not in the cart', async () => {
      var product3 = {
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
      const thirdStoreState = renderHook(() =>
        StoreItem({ product: product3 })
      );

      const { result } = thirdStoreState;
      const current = result.current as HookStateType;

      act(() => result.current.plusProduct());
      var itemcart1 = {
        ...product,
        quantity: 10000,
      };
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }

      expect(current.cartItems).toStrictEqual([itemcart1, itemcart2]);
      expect(current.cartItems).toStrictEqual(localStorageValue);
    });
  });

  describe('useStoreItem HOOK => Method:minusProduct', () => {
    it('method: minusProduct, it should decrease the current quantity by 1', async () => {
      const { result } = hookStates;
      const current = result.current as HookStateType;

      const spy = jest.spyOn(current, 'minusProduct');
      act(() => current.minusProduct());
      var itemcart1 = {
        ...product,
        quantity: 9999,
      };
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }
      const { cartItems } = result.current as HookStateType;

      expect(spy).toHaveBeenCalledTimes(1);
      expect(cartItems).toStrictEqual([itemcart1, itemcart2]);
      expect(cartItems).toStrictEqual(localStorageValue);
    });

    it('method: minusProduct, remove the product if  the current quantity  decreased by 1 is equal to 0', async () => {
      const { result } = hookStates;
      const current = result.current as HookStateType;

      const times = current.cartItems[0].quantity;

      for (let i = 0; i <= times - 1; i++) {
        await act(() => current.minusProduct());
      }
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }
      const { cartItems } = result.current as HookStateType;

      expect(cartItems).toStrictEqual([itemcart2]);
      expect(cartItems).toStrictEqual(localStorageValue);
    });
    it('method: minusProduct, it should throw an error if the product that is trying to decrease the quantity is not in the cart', async () => {
      var product3 = {
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
      let thirdStoreState = renderHook(() => StoreItem({ product: product3 }));

      const { result } = thirdStoreState;
      const current = result.current as HookStateType;

      act(() => result.current.minusProduct());
      var itemcart2 = {
        ...product2,
        quantity: 1,
      };
      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }
      expect(current.cartItems).toStrictEqual([itemcart2]);
      expect(current.cartItems).toStrictEqual(localStorageValue);
    });

    it("method: minusProduct,  should return an empty array if there's no items in the cart", async () => {
      let secondState = renderHook(() => StoreItem({ product: product2 }));
      const { result } = secondState;

      const current = result.current as HookStateType;

      let localStorageValue = localStorage.getItem('items');
      if (localStorageValue) {
        localStorageValue = JSON.parse(localStorageValue);
      }

      act(() => result.current.minusProduct());
      expect(current.cartItems).toStrictEqual([]);
      expect(current.cartItems).toStrictEqual(localStorageValue);
    });
  });
});
