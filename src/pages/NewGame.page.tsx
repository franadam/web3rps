import React, { FC, useCallback, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { parseEther } from '@ethersproject/units';
import { useNavigate } from 'react-router-dom';

import { Hasher } from '../abis/Hasher.abi';
import { RPS } from '../abis/RPS.abi';

import { Card, NewGameForm, JoinGame } from '../components';
import { randomSalt } from '../utils';
import actions from '../context/game.action';
import { useGame, useContract, useContractFactory } from '../hooks';
import { NewGameData } from '../interfaces';

export const NewGame: FC = (): JSX.Element => {
  const hasher = useContract(Hasher);
  const rps = useContractFactory(RPS);
  const navigate = useNavigate();
  const [gameLoading, setGameLoading] = useState(false);
  const { dispatch } = useGame();

  const handleNewGame = useCallback(
    async ({ j1Move, j2Address, stake }: NewGameData) => {
      setGameLoading(true);
      const salt = randomSalt();

      if (!hasher || !rps) return setGameLoading(false);

      try {
        const j1Hash = await hasher.hash(j1Move, salt);
        const contract = await rps.deploy(j1Hash, j2Address, {
          value: parseEther(stake.toString()),
          gasLimit: 1000000,
        });

        await contract.deployed();
        dispatch(
          actions.setGameCreated({
            address: contract.address,
            salt: salt,
            j1Move,
          })
        );
        navigate(`/game/${contract.address}`, {
          state: { salt: salt, move: j1Move },
        });
        setGameLoading(false);
      } catch (err) {
        setGameLoading(false);
      }
    },
    [hasher, rps, dispatch, navigate]
  );

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
      <Card>
        {!gameLoading && (
          <Typography
            variant="h6"
            fontWeight="bold"
            component="div"
            align="center"
            mt={2}
          >
            Create a game
          </Typography>
        )}
        <Paper sx={{ p: 5 }}>
          {!gameLoading ? (
            <>
              <NewGameForm onClick={handleNewGame} />
              <Typography
                variant="h6"
                component="div"
                align="center"
                mt={3}
              >
                OR
              </Typography>
              <JoinGame />
            </>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Typography
                variant="h6"
                component="div"
              >
                Creating game
              </Typography>
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Card>
    </Container>
  );
};
