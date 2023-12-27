import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useWeb3Wallet } from '../hooks';
import MetamaskLogo from '../assets/metamask.logo.png';
import { Modal } from './Modal.component';

export const ConnectWallet: FC = (): JSX.Element => {
  const { connect, loading, disconnect, active } = useWeb3Wallet();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button
        color={!active ? 'success' : 'error'}
        variant="contained"
        onClick={() => (active ? disconnect() : handleOpen())}
        disabled={loading}
        size="medium"
      >
        {!active ? 'Connect wallet' : 'Disconnect'}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Connect wallet"
        render={
          <Box
            display="flex"
            alignItems="center"
            paddingX={4}
            paddingBottom={4}
            gap={4}
            justifyContent="center"
            flexDirection="column"
          >
            <Button
              color="secondary"
              onClick={() => connect().then(() => handleClose())}
              disabled={loading}
              variant="outlined"
              size="medium"
              style={{ display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              <img
                src={MetamaskLogo}
                width="20px"
                height="20px"
                alt="Metamask"
              />
              Metamask
            </Button>
          </Box>
        }
      />
    </Box>
  );
};
