import { Game } from '../interfaces';

export const secondsToMiliseconds = (seconds: number): number => seconds * 1000;

export const secondsUntilTimeout = (
  { lastAction, timeout }: Game,
  currentDate: Date
): number => {
  return Math.round(
    (timeout - (currentDate.getTime() - lastAction.getTime())) / 1000
  );
};

export const secondsToTime = (e: number) => {
  const m = Math.floor((e % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(e % 60)
    .toString()
    .padStart(2, '0');

  return m + ':' + s;
};
