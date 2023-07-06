import { Box, Typography } from '@mui/material';
import { CalculationTotal } from '../calculation-total.hook';
export const PayButton = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { total } = CalculationTotal();
  const paymentHandler = () => {
    if (total !== 0) {
    }
    setOpen(false);
  };

  return (
    <Box
      onClick={paymentHandler}
      id="payment button"
      sx={{
        display: `flex`,
        width: `100%`,
        height: `8.5%`,
        backgroundColor: 'primary.main',
        justifyContent: `space-evenly`,
        mt: `2.5rem`,
        position: 'relative',
      }}
    >
      {total !== 0 ? (
        <Box sx={{ alignSelf: `center` }}>
          {' '}
          <Typography color="white" variant="h5">
            {' '}
            PAY
          </Typography>
        </Box>
      ) : (
        <Box sx={{ alignSelf: `center` }}>
          {' '}
          <Typography color="white" variant="h5">
            {' '}
            CART{' '}
          </Typography>{' '}
        </Box>
      )}
      <Box
        sx={{
          display: `flex`,
          width: `30%`,
          height: `70%`,
          backgroundColor: `white`,
          color: `primary.main`,
          marginLeft: `2rem`,
          justifyContent: `center`,
          alignItems: `center`,
          alignSelf: `center`,
        }}
      >
        <Typography variant="h6">
          {' '}
          ${total && total !== undefined ? total : 0}
        </Typography>
      </Box>
    </Box>
  );
};
