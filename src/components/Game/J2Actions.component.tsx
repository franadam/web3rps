import React, { FC } from 'react';

import { hasJ2Played, isGameDone } from '../../utils';
import { Play } from './Play.component';
import { useGame } from '../../hooks';

export const J2Actions: FC = (): JSX.Element => {
  const {
    state: { game },
  } = useGame();
  const hasPlayed = hasJ2Played(game);
  const gameDone = isGameDone(game);

  return <>{!hasPlayed && !gameDone && <Play />}</>;
};
