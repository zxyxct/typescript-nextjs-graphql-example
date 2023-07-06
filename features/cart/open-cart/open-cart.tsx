import { styled } from '@mui/system';
import React, { Dispatch, SetStateAction } from 'react';
import { PayButton } from './pay-button';
import { ProductRowContainer } from './product-row-container';
import { Header } from './header';
interface OpenCartProps {
  children?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const OpenCart = ({ setOpen }: OpenCartProps) => {
  const CartContainer = styled('div')(({ theme }) =>
    theme.unstable_sx({
      height: `100vh`,
      width: { xs: `100%`, sm: `55%`, md: `55%`, lg: `30%` },
      backgroundColor: `white`,
      position: `absolute`,
      left: { xs: '0', sm: '45vw', md: '45vw', lg: '70vw' },
    })
  );

  return (
    <CartContainer key={'cart-container-unique'}>
      <Header setOpen={setOpen} />

      <ProductRowContainer />
      <PayButton setOpen={setOpen} />
    </CartContainer>
  );
};
