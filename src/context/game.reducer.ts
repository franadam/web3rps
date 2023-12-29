import { GameAction, GameState } from '../interfaces';

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...state,
        game: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isError: action.payload,
      };
    case 'SET_FETCHING':
      return {
        ...state,
        isFetching: action.payload,
      };
    case 'SET_GAME_CREATED':
      return {
        ...state,
        gameCreated: action.payload,
      };
    default:
      return state;
  }
};
