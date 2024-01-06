import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useWeb3Network, useWeb3Wallet } from '../hooks';
import { Header } from './Header.component';
import { Login } from '../pages';
import { SwitchNetwork } from './SwitchNetwork.component';

export const DashboardLayout: FC = (): JSX.Element => {
  const { active, loading } = useWeb3Wallet();
  const { networkError } = useWeb3Network();

  return (
    <>
      <Header />
      <Box
        display="flex"
        flex={1}
        height="100%"
      >
        <Box
          width="100%"
          height="100%"
          padding={5}
          margin={8}
        >
          {networkError ? (
            <SwitchNetwork />
          ) : loading ? (
            <CircularProgress />
          ) : active ? (
            <Outlet />
          ) : (
            <Login />
          )}
        </Box>
      </Box>
    </>
  );
};
