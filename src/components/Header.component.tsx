import React, { FC } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Modal,
  Paper,
  Avatar,
} from '@mui/material';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useNavigate } from 'react-router-dom';
import { FaHandSpock } from 'react-icons/fa';

import { useWeb3Wallet } from '../hooks';
import { ConnectWallet } from './ConnectWallet.component';
import { useGetPlayerBalance } from '../utils';

export const Header: FC = (): JSX.Element => {
  const { account } = useWeb3Wallet();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
      >
        <Toolbar>
          <IconButton
            onClick={() => navigate('/')}
            edge="start"
          >
            <FaHandSpock style={{ margin: '.5rem', color: 'orange' }} />
            <Typography
              variant="h6"
              component="div"
            >
              RPSLS
            </Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {!!account && (
            <IconButton onClick={handleModalOpen}>
              <Avatar>
                <Jazzicon
                  diameter={35}
                  seed={jsNumberForAddress(account)}
                />
              </Avatar>
            </IconButton>
          )}
          <ConnectWallet />
        </Toolbar>
      </AppBar>
      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
        <Paper>
          <Box p={2}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Your account
            </Typography>
            <Typography variant="body1">👱 Address: {account}</Typography>
            <Typography variant="body1">
              🤑 Balance: {useGetPlayerBalance()} ETH
            </Typography>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
