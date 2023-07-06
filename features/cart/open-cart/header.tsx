import { useReactiveVar } from '@apollo/client/react/hooks/useReactiveVar';
import { CartItemsVar } from '@graphql/cache';
import { CartLocalStorageI } from '@graphql/types';
import { Typography, Box } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

export const Header: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const data: { cartItems: CartLocalStorageI } = {
    cartItems: useReactiveVar(CartItemsVar),
  };
  return (
    <Box
      sx={{
        display: `flex`,
        justifyContent: `space-evenly`,
        alignItems: `baseline`,
        marginTop: `1rem`,
        color: `primary.main`,
      }}
    >
      <FaShoppingBag style={{ width: '2rem', height: '2rem' }}></FaShoppingBag>
      {data ? (
        data.cartItems.length === 0 ? (
          <Typography variant="h5"> No items</Typography>
        ) : (
          <Typography variant="h5">
            {' '}
            {`items ${data.cartItems.length}`}
          </Typography>
        )
      ) : null}
      <Box
        sx={{
          width: `5vw`,
          height: `   5vh`,
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `center`,
          alignContent: 'center',
        }}
        onClick={() => setOpen(false)}
      >
        <Typography variant="h5"> X </Typography>
      </Box>
    </Box>
  );
};
