import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const Card: FC<CardProps> = ({ children, header, ...props }) => {
  return (
    <Paper {...props}>
      {header && header}
      <Box p={3}>{children}</Box>
    </Paper>
  );
};
