import React, { FC, useCallback, useState } from 'react';
import {
  Card,
  CardHeader,
  Button,
  Input,
  FormControl,
  Grid,
  CircularProgress,
  Typography,
  InputLabel,
} from '@mui/material';
import {
  BigNumber,
  isBigNumberish,
} from '@ethersproject/bignumber/lib/bignumber';
import { toast } from 'react-toastify';

import actions from '../../context/game.action';
import { RPS } from '../../abis/RPS.abi';
import { getGameData } from '../../utils';
import { useContract, useGame } from '../../hooks';
import { Move } from '../../interfaces';
import { SelectMove } from '../SelectMove.component';

export const Solve: FC = (): JSX.Element => {
  const {
    state: { isFetching, game },
    dispatch,
  } = useGame();
  const [move, setMove] = useState<Move>();
  const [salt, setSalt] = useState<string>();

  const contract = useContract({ abi: RPS.abi, address: game.address });

  const onSubmit = useCallback(
    async (data: { move?: Move; salt?: any }) => {
      dispatch(actions.setIsFetching(true));
      const { move, salt } = data;

      if (!isBigNumberish(salt)) {
        toast.error('Error with salt, verify what you entered');
        dispatch(actions.setIsFetching(false));
        return;
      }

      try {
        const txn = await contract.solve(move, salt);
        await txn.wait();
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(actions.setIsFetching(false));

        try {
          dispatch(actions.setIsLoading(true));

          const [updatedGameData, playerOneWins, playerTwoWins] =
            await Promise.all([
              getGameData(contract),
              contract.win(move, game.j2.move),
              contract.win(game.j2.move, move),
            ]);

          const result = playerOneWins
            ? 'Player 1'
            : playerTwoWins
            ? 'Player 2'
            : "It's a tie";

          if (result === 'Player 1') {
            toast.success('🤑 You win!');
          } else if (result === 'Player 2') {
            toast.error('You lose! Try again 👊');
          } else {
            toast.info("It's a tie!");
          }

          updatedGameData.j1.move = Number(move) as Move;
          updatedGameData.j1.salt = salt as BigNumber;
          updatedGameData.result = result;

          dispatch(actions.setGameData(updatedGameData));
        } finally {
          dispatch(actions.setIsLoading(false));
        }
      }
    },
    [contract, dispatch, game.j2.move]
  );

  return (
    <Card>
      <CardHeader title="Complete the game" />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        p={5}
        gap={4}
      >
        {isFetching ? (
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <Typography mb={3}>Fetching results</Typography>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <FormControl
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="j1Move">First move</InputLabel>
              <SelectMove
                id="j1Move"
                label="First move"
                value={move}
                onChange={(e) => setMove(Number(e.target.value))}
              />
            </FormControl>
            <FormControl
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="salt">Salt</InputLabel>
              <Input
                id="salt"
                type="text"
                fullWidth
                placeholder="Your salt"
                onChange={(e) => setSalt(e.target.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => onSubmit({ move, salt: salt })}
              disabled={!move || !salt}
            >
              Reveal Your Move
            </Button>
          </>
        )}
      </Grid>
    </Card>
  );
};
