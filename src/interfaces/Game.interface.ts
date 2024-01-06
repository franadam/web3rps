import { BigNumber } from 'ethers';

export enum Move {
  Null = 0,
  Rock = 1,
  Paper = 2,
  Scissors = 3,
  Lizard = 4,
  Spock = 5,
}

export type MoveValue = (typeof Move)[keyof typeof Move];
export type MoveKey = keyof typeof Move;

export interface Game {
  address: string;
  j1: {
    address: string;
    commitment: string;
    move?: Move;
    salt?: BigNumber;
  };
  j2: {
    address: string;
    move: Move;
  };
  stake: BigNumber;
  lastAction: Date;
  timeout: number;
  result: string;
}

export interface GameCreated {
  j1Move: Move;
  salt?: BigNumber;
  address: string;
}

export interface GameState {
  game: Game;
  gameCreated: GameCreated;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
}

export type GameAction =
  | { type: 'SET_GAME'; payload: Game }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: boolean }
  | { type: 'SET_FETCHING'; payload: boolean }
  | { type: 'SET_GAME_CREATED'; payload: GameCreated };

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export type GameStatusType =
  | 'pending'
  | 'settled'
  | 'cancelled'
  | 'actionNeeded';

export interface NewGameData {
  j1Move: Move;
  j2Address: string;
  stake: number;
}
