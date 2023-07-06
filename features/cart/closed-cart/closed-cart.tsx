import { Box, Typography } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import { WindowWidthHook } from '@hooks/window-width';
import { Dispatch, SetStateAction } from 'react';
import { CalculationTotal } from '../calculation-total.hook';
export const ClosedCart: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const { currentWidth } = WindowWidthHook();
  const { quantity, total } = CalculationTotal();

  return (
    <Box
      id="cart-button-container"
      style={{
        width: `99.5vw`,
        height: `90vh`,
        position: `fixed`,
        zIndex: `5000`,
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `flex-end`,
        pointerEvents: `none`,
      }}
    >
      <Box
        id="cart-button"
        sx={{
          backgroundColor: `primary.main`,
          width: `auto`,
          position: `absolute`,
          zIndex: `5001`,
          transform: {
            xs: `translateY(1.8vh)`,
            sm: `translateY(1.8vh)`,
            md: `translateY(30vh)`,
            lg: `translateY(30vh)`,
          },
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          padding: `calc( (.50vw + .50vh) / (2) )`,
          pointerEvents: `all`,
          height: `auto`,
          marginRight: { xs: `8vw`, sm: `8vw`, md: `0vw` },
        }}
        onClick={() => setOpen(true)}
      >
        <div style={{ display: 'flex', flexWrap: `wrap`, width: `auto` }}>
          <FaShoppingCart size="1.8em" style={{ color: 'white' }}>
            {' '}
          </FaShoppingCart>
          <Typography
            sx={{ marginInlineStart: '.5rem' }}
            color="white"
            variant="subtitle1"
          >
            {`(`}
            {quantity}
            {`)`} items{' '}
          </Typography>
        </div>
        {currentWidth && currentWidth >= 900 ? (
          <div
            style={{
              display: 'flex',
              borderRadius: '25px',
              backgroundColor: 'white',
              minHeight: '8vh',
              width: `70%`,
              margin: `auto`,
              marginTop: `.3rem`,
              alignItems: `center`,
              flexWrap: `wrap`,
              marginBottom: `.5rem`,
            }}
          >
            <Typography
              style={{
                flex: 1,
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                wordBreak: 'break-all',
                textAlign: `center`,
              }}
            >
              ${total && total !== undefined && total !== 0 ? total : 0}
            </Typography>
          </div>
        ) : null}
      </Box>
    </Box>
  );
};
