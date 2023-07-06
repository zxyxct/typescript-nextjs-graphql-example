import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DialogContent } from '@mui/material';
import { OpenCart } from '@features/cart/open-cart/open-cart';
import { useState } from 'react';
import { ClosedCart } from '../closed-cart/closed-cart';
export const CartButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Modal
        id="modal-cart-button"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-cart"
        aria-describedby="modal-modal-openscart"
      >
        <DialogContent style={{ padding: '0' }}>
          <OpenCart setOpen={setOpen}> </OpenCart>
        </DialogContent>
      </Modal>
      {/* Button closed it shows the total */}
      {open === false && <ClosedCart setOpen={setOpen} />}
    </Box>
  );
};
