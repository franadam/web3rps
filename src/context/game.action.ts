import { Game, GameCreated } from '../interfaces';

const setIsLoading = (
  value: boolean
): { type: 'SET_LOADING'; payload: boolean } => ({
  type: 'SET_LOADING',
  payload: value,
});

const setIsFetching = (
  value: boolean
): { type: 'SET_FETCHING'; payload: boolean } => ({
  type: 'SET_FETCHING',
  payload: value,
});

const setGameData = (value: Game): { type: 'SET_GAME'; payload: Game } => ({
  type: 'SET_GAME',
  payload: value,
});

const setError = (value: boolean): { type: 'SET_ERROR'; payload: boolean } => ({
  type: 'SET_ERROR',
  payload: value,
});

const setGameCreated = (
  value: GameCreated
): { type: 'SET_GAME_CREATED'; payload: GameCreated } => ({
  type: 'SET_GAME_CREATED',
  payload: value,
});

const actions = {
  setGameCreated,
  setGameData,
  setIsFetching,
  setIsLoading,
  setError,
};

export default actions;
