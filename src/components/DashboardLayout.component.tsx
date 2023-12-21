import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { Header } from './Header.component';

export const DashboardLayout: FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <Box
        display="flex"
        flex={1}
        height="100%"
        border={'1px dashed grey'}
      >
        <Box
          width="100%"
          height="100%"
          padding={5}
          margin={8}
          border={'1px dashed red'}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
