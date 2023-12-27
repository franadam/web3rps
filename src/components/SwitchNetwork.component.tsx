import React, { FC } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import styled from 'styled-components';

import { useWeb3Network } from '../hooks';

const Card = styled(Box)`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  && {
    background-color: red;
    color: white;
    &:hover {
      background-color: #ff5252;
    }
  }
`;

export const SwitchNetwork: FC = (): JSX.Element => {
  const { chainId, switchNetwork } = useWeb3Network();

  return (
    <Container maxWidth="md">
      <Card>
        <CardHeader variant="h6">Wrong network</CardHeader>
        <Box
          textAlign="center"
          p={2}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
          >
            You &apos;re on the wrong network: {chainId}
          </Typography>
          <StyledButton
            variant="contained"
            color="secondary"
            size="large"
            onClick={switchNetwork}
            sx={{ mt: 4 }}
          >
            Switch to Goerli
          </StyledButton>
        </Box>
      </Card>
    </Container>
  );
};
