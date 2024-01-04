import { useContext } from 'react';
import { GameContext } from '../context/Game.context';

export const useGame = () => {
  const { state, dispatch } = useContext(GameContext);
  return {
    state,
    dispatch,
  };
};
