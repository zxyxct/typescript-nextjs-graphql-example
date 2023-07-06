'use client';
import { FC } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { UsePaginatedProducts } from '@features/products/use-paginated-products.hook';
import { lazy, Suspense } from 'react';
import { Loading } from '@features/ui/loading';
const PaginatedProducts = lazy(() =>
  import('@features/products/paginated-products').then(module => ({
    default: module.PaginatedProducts,
  }))
);
const Products: FC = () => {
  const { products, pagination, nextProductsHandler } = UsePaginatedProducts();
  return (
    <Box
      id="page-container"
      sx={{
        display: 'grid',
        flexDirection: 'column',
        flexGrow: 1,
        width: { xs: `90%`, sm: `90%`, md: `80%`, lg: `80%`, xl: `80%` },
        margin: `2.5vh auto 0 auto`,
      }}
    >
      <Grid
        container
        sx={{ justifyContent: `center` }}
        spacing={{ xs: 2, sm: 3, md: 5, lg: 8, xl: 8 }}
        columns={{ xs: 2, sm: 3, md: 12, lg: 10 }}
      >
        {products !== null ? (
          <Suspense fallback={<Loading />}>
            <PaginatedProducts products={products} pagination={pagination} />
          </Suspense>
        ) : null}
      </Grid>
      {products && products.length > pagination ? (
        <Button
          sx={{ justifySelf: 'center', width: '30%' }}
          onClick={nextProductsHandler}
          variant="contained"
        >
          {' '}
          Render Next{' '}
        </Button>
      ) : null}
    </Box>
  );
};
export default Products;
