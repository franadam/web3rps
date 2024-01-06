import React, { FC, useCallback, useState } from 'react';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

import {
  canJ1Refund,
  canJ2Refund,
  getGameData,
  getPlayerId,
  hasJ2Played,
  isGameDone,
  secondsToTime,
  secondsUntilTimeout,
} from '../../utils';
import { RPS } from '../../abis/RPS.abi';
import { useContract, useGame } from '../../hooks';
import actions from '../../context/game.action';

interface InactiveRefundProps {
  handleDone?: () => void;
}

const InactiveRefundButton = ({ handleDone }: InactiveRefundProps) => {
  const {
    state: { game },
  } = useGame();

  const [timeoutInSeconds, setTimeoutInSeconds] = useState(
    secondsUntilTimeout(game, new Date())
  );

  setInterval(() => {
    const secondsLeft = secondsUntilTimeout(game, new Date());
    if (secondsLeft >= 0) {
      setTimeoutInSeconds(secondsLeft);
    } else {
      handleDone && handleDone();
    }
  }, 1000);

  return (
    <Tooltip
      title="Opponent has 5 minutes to play"
      placement="top"
      arrow
    >
      <Button
        disabled
        color="primary"
      >
        Cancel available in {secondsToTime(timeoutInSeconds)}
      </Button>
    </Tooltip>
  );
};

export const GameRefund: FC = (): JSX.Element => {
  const {
    state: { game, isLoading, isFetching },
    dispatch,
  } = useGame();
  const contract = useContract({ abi: RPS.abi, address: game.address });
  const gameDone = isGameDone(game);
  const playerId = getPlayerId(game);
  const currentDate = new Date();
  const [canClaimTimeout, setCanClaimTimeout] = useState(
    playerId === 1
      ? canJ1Refund(game, currentDate)
      : canJ2Refund(game, currentDate)
  );

  const handleClaimTimeout = useCallback(async () => {
    try {
      dispatch(actions.setIsFetching(true));

      const action =
        playerId === 1 ? contract.j2Timeout() : contract.j1Timeout();
      const txn = await action;
      await txn.wait();
    } catch (err) {
      console.error('Error on claim timeout', err);
    } finally {
      dispatch(actions.setIsFetching(false));
      try {
        dispatch(actions.setIsLoading(true));
        dispatch(actions.setGameData(await getGameData(contract)));
      } finally {
        dispatch(actions.setIsLoading(false));
      }
    }
  }, [contract, dispatch, playerId]);

  if (gameDone || !playerId)
    return (
      <Link to="/">
        <Button color="primary">Create new game</Button>
      </Link>
    );
  if (playerId === 1 && hasJ2Played(game)) return <></>;
  if (playerId === 2 && !hasJ2Played(game)) return <></>;

  return !isLoading ? (
    canClaimTimeout ? (
      <Tooltip
        title="Cancel game and retrieve your stake"
        arrow
      >
        <Button
          color="primary"
          onClick={handleClaimTimeout}
          variant="contained"
          disabled={isFetching}
        >
          Cancel game
        </Button>
      </Tooltip>
    ) : (
      <InactiveRefundButton handleDone={() => setCanClaimTimeout(true)} />
    )
  ) : (
    <CircularProgress />
  );
};
