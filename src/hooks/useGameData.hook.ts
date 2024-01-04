import { useEffect } from 'react';

import { getGameData } from '../utils';
import actions from '../context/game.action';
import { useContract } from './useContract.hook';
import { RPS } from '../abis/RPS.abi';
import { useGame } from './useGame.hook';

export interface Props {
  address: string;
}

export const useGameData = ({ address }: Props): void => {
  const { dispatch } = useGame();
  const contract = useContract({ abi: RPS.abi, address });

  useEffect(() => {
    dispatch(actions.setIsLoading(true));

    getGameData(contract)
      .then((gameData) => {
        dispatch(actions.setGameData(gameData));
      })
      .catch(() => {
        dispatch(actions.setError(true));
      })
      .finally(() => {
        dispatch(actions.setIsLoading(false));
      });
  }, [contract]);
};
