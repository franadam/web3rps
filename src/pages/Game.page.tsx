import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

import {
  Actions,
  GameInfo,
  GameRefund,
  GameStatus,
  GameCreated,
} from '../components/Game';
import { useGame, useGameData } from '../hooks';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1rem;
`;

const StyledCardContent = styled(CardContent)`
  padding: 1rem;
`;

export const Game: FC = (): JSX.Element => {
  const { contract } = useParams() as NonNullable<{ contract: string }>;

  useGameData({ address: contract });

  const {
    state: { game, gameCreated },
  } = useGame();

  if (contract && gameCreated.j1Move && gameCreated.salt) {
    return (
      <GameCreated
        move={gameCreated.j1Move}
        salt={gameCreated.salt}
        address={contract}
      />
    );
  }

  return (
    <StyledContainer maxWidth="md">
      <Helmet>
        <title>Game {game.address}</title>
      </Helmet>

      <Box
        display="flex"
        flexDirection="column"
        gap="2rem"
      >
        <StyledCard>
          <StyledCardContent>
            <Box
              display="flex"
              flexDirection={['column', 'row']}
              alignItems="center"
              justifyContent="space-between"
              gap="1rem"
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  mb="0.5rem"
                >
                  Status
                </Typography>
                <GameStatus />
              </Box>

              <GameRefund />
            </Box>
          </StyledCardContent>
        </StyledCard>
        <Actions />
        <StyledCard>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
            >
              Game Info
            </Typography>
            <GameInfo game={game} />
          </CardContent>
        </StyledCard>
      </Box>
    </StyledContainer>
  );
};
