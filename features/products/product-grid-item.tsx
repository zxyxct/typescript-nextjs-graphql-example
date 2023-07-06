'use client';
import { Grid, Box, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { ProductGridItemPropsI } from './types';
import { lazy, Suspense } from 'react';
import { Loading } from '@features/ui/loading';
const ProductItemButtons = lazy(() =>
  import('./product-item-buttons').then(module => ({
    default: module.ProductItemButtons,
  }))
);
export const ProductGridItem: React.FC<ProductGridItemPropsI> = ({
  product,
  index,
  productDetailsHandle,
}) => {
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.transform = `scale(1.1)`;
    target.style.transition = `transform .33s`;
  };
  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const target = e.currentTarget as HTMLDivElement;
    target.style.transform = `scale(1)`;
  };
  return (
    <Grid
      id="grid-item-cards-test"
      sx={{
        display: `flex`,
        justifyContent: `center`,
      }}
      item
      xs={1}
      sm={1}
      md={4}
      lg={2}
      key={product.id}
    >
      <Paper
        elevation={2}
        sx={{
          textAlign: `center`,
          minHeight: `30vh`,
          maxWidth: `22em`,
          color: `primary.main`,
          marginBottom: `3vh`,
          width: `100%`,
          display: `flex`,
          flexDirection: `column`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box onClick={() => productDetailsHandle(index)}>
          <Box
            sx={{
              display: 'block',
              width: '100%',
              height: '1.5vh',
              backgroundColor: `primary.main`,
            }}
          >
            {' '}
          </Box>
          <Box
            sx={{
              borderLeft: `.75rem solid`,
              width: 'auto',
              height: { xs: '15.75vh', sm: '15.75vh', md: '22vh', lg: '22vh' },
              position: `relative`,
              overflow: `hidden`,
            }}
          >
            <Image
              priority
              alt={`Hubo un error al cargar la imagen ${product.id}`}
              sizes="(max-width: 600px) 25vw, (max-width: 900px) 33.33vw, (max-width: 1200px) 50vw, (max-width: 1536px) 75vw"
              src={product.image}
              onError={e => console.log('error image :  ', e)}
              quality={25}
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>

          <Box
            sx={{
              height: `12vh`,
              display: `flex`,
              flexDirection: `column`,
              justifyContent: `center`,
            }}
          >
            <Typography sx={{ width: '80%', margin: 'auto' }} noWrap mt=".5rem">
              {' '}
              {product.title}
            </Typography>
            <div
              style={{
                display: `flex`,
                width: `100%`,
                justifyContent: `center`,
              }}
            >
              <Typography style={{ color: 'black' }}>
                {' '}
                {`$ ${product.price} `}
              </Typography>
              <Typography
                style={{
                  color: 'black',
                  marginInlineStart: `1rem`,
                  textDecorationLine: `line-through`,
                }}
              >
                {`$ ${Number(product.price * 0.2).toFixed(2)}`}
              </Typography>
            </div>
          </Box>
        </Box>
        <Suspense fallback={<Loading />}>
          <ProductItemButtons product={product} />
        </Suspense>
      </Paper>
    </Grid>
  );
};
