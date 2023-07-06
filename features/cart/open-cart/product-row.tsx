import { CartProductI } from '@graphql/types';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import StoreButtons from '@features/cart/store-buttons-cart/store-buttons';
export const ProductRow = ({
  product,
  index,
}: {
  product: CartProductI;
  index: number;
}) => {
  return (
    <Stack
      key={product.id}
      direction="row"
      sx={{
        textAlign: `center`,
        alignItems: `center`,
        padding: `1rem`,
        flexWrap: `wrap`,
        justifyContent: `space-evenly`,
      }}
    >
      <Box
        style={{
          width: `35%`,
          height: `100%`,
          position: `relative`,
        }}
      >
        <Image
          priority
          sizes="(max-width: 600px) 25vw, (max-width: 900px) 33.33vw, (max-width: 1200px) 50vw, (max-width: 1536px) 75vw"
          alt={`Hubo un error al cargar la imagen ${index}`}
          quality={25}
          src={product.image}
          fill
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Box
        sx={{
          display: `flex`,
          justifyContent: `space-evenly`,
          alignItems: `center`,
          flexDirection: `column`,
          width: `35%`,
        }}
      >
        <Typography key={product.id}> {product.title} </Typography>
        <Typography>{`$${product.price}`}</Typography>

        <Box
          sx={{
            display: `flex`,
            alignItems: `center`,
            flexDirection: `row`,
          }}
        >
          <Box>
            <Typography>
              {product.quantity} X {product.quantity}
            </Typography>
            <Typography>
              {' '}
              {`$${(product.price * product.quantity).toFixed(2)}`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <StoreButtons product={product} />
    </Stack>
  );
};
