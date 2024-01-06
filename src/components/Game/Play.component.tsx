import React, { FC, useCallback, useState } from 'react';
import {
  Card,
  CardHeader,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

import actions from '../../context/game.action';
import { getGameData } from '../../utils';
import { RPS } from '../../abis/RPS.abi';
import { SelectMove } from '../SelectMove.component';
import { useContract, useGame } from '../../hooks';

const StyledBox = styled(Box)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Play: FC = (): JSX.Element => {
  const {
    state: { isFetching, game },
    dispatch,
  } = useGame();
  const { stake, address } = game;
  const contract = useContract({ abi: RPS.abi, address });
  const [move, setMove] = useState('');

  const onSubmit = useCallback(async () => {
    dispatch(actions.setIsFetching(true));

    if (!move) {
      dispatch(actions.setIsFetching(false));
      return;
    }

    try {
      const txn = await contract.play(move, {
        value: stake,
      });
      await txn.wait();
    } catch (err) {
      console.error('Error during play() transaction:', err);
    } finally {
      dispatch(actions.setIsFetching(false));

      try {
        dispatch(actions.setIsLoading(true));
        dispatch(actions.setGameData(await getGameData(contract)));
      } finally {
        dispatch(actions.setIsLoading(false));
      }
    }
  }, [contract, dispatch, move, stake]);

  return (
    <Card>
      <CardHeader title="Choose Your Move" />
      <StyledBox>
        {!isFetching ? (
          <SelectMove
            id="j1Move"
            label="Choose a move"
            onChange={(e) => setMove(e.target.value as string)}
          />
        ) : (
          <>
            <Typography variant="body1">Submitting your move</Typography>
            <CircularProgress />
          </>
        )}
        {!isFetching && (
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={!move}
          >
            Make a Move
          </Button>
        )}
      </StyledBox>
    </Card>
  );
};
