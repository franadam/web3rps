import React, { FC } from 'react';
import { Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';

import { ConnectWallet } from '../components';

export const Login: FC = (): JSX.Element => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={1}
      >
        Play the Web3 version of the famous game Rock Paper Scissors Lizard
        Spock <br />
      </Typography>
      <Typography
        variant="body1"
        fontWeight="medium"
        mb={6}
      >
        Choose a move, your opponent, a stake price, and you &apos;re all set.
      </Typography>
      <Card style={{ padding: '2rem', boxShadow: '1 rem 1rem 2rem green' }}>
        <h2>Please login to use RPS</h2>
        <Container maxWidth="sm">
          <ConnectWallet />
        </Container>
      </Card>
    </Container>
  );
};
