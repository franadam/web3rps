import React, { createContext, useReducer } from 'react';
import { parseEther } from '@ethersproject/units';

import { GameContextType, GameState, Move } from '../interfaces';
import { gameReducer } from './game.reducer';

export const Moves = {
  1: '👊 Rock',
  2: '📃 Paper',
  3: '✂️ Scissors',
  4: '🦎 Lizard',
  5: '🖖 Spock',
} as const;

const initialState: GameState = {
  game: {
    address: '',
    j1: {
      address: '',
      commitment: '',
    },
    j2: {
      address: '',
      move: Move.Null,
    },
    stake: parseEther('0.001'),
    lastAction: new Date(0),
    result: '',
    timeout: 0,
  },
  gameCreated: {
    address: '',
    j1Move: Move.Null,
    salt: undefined,
  },
  isLoading: false,
  isError: false,
  isFetching: false,
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
