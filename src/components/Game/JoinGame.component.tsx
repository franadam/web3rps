import React, { FC, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { isAddress } from '@ethersproject/address';
import { useNavigate } from 'react-router-dom';

export const JoinGame: FC = (): JSX.Element => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        mt={1}
        mb={3}
      >
        Join a game
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={4}
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            type="text"
            label="Enter game address"
            variant="outlined"
            error={address.length > 6 && !isAddress(address)}
            helperText={
              address.length > 6 && !isAddress(address)
                ? 'Please enter a valid game address'
                : ''
            }
            onChange={(e) => setAddress(e.target.value)}
          />
        </Box>
        <Button
          color="primary"
          variant="contained"
          disabled={!address || !isAddress(address)}
          onClick={() => navigate(`/game/${address}`)}
        >
          Go to game
        </Button>
      </Box>
    </Box>
  );
};
