import React, { FC } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Tag from '@mui/material/Chip';
import { CgDanger, CgSandClock } from 'react-icons/cg';
import { ImCheckmark, ImCross } from 'react-icons/im';

import { getPlayerId, hasJ2Played, isGameDone } from '../../utils';
import { Game, GameStatusType } from '../../interfaces/Game.interface';
import { useGame } from '../../hooks';

const getGameStatusTag = (
  game: Game
): {
  icon: any;
  color: 'default' | 'error' | 'primary' | 'secondary';
  label: string;
} => {
  const isSettled = isGameDone(game);
  const hasPlayed = hasJ2Played(game);
  const playerId = getPlayerId(game);
  let status: GameStatusType;

  if (!playerId) {
    status = isSettled
      ? hasPlayed
        ? 'settled'
        : 'cancelled'
      : !hasPlayed
      ? 'actionNeeded'
      : 'pending';
  } else {
    status = isSettled
      ? hasPlayed
        ? 'settled'
        : 'cancelled'
      : playerId === 1 && hasPlayed
      ? 'actionNeeded'
      : playerId === 2 && !hasPlayed
      ? 'actionNeeded'
      : 'pending';
  }

  switch (status) {
    case 'settled':
      return {
        icon: ImCheckmark,
        color: 'primary',
        label: 'Settled',
      };
    case 'cancelled':
      return {
        icon: ImCross,
        color: 'error',
        label: 'Cancelled',
      };
    case 'actionNeeded':
      return {
        icon: CgDanger,
        color: 'error',
        label: 'Action needed',
      };
    case 'pending':
      return {
        icon: CgSandClock,
        color: 'default',
        label: 'Pending',
      };
  }
};

export const GameStatus: FC<BoxProps> = ({ ...props }): JSX.Element => {
  const {
    state: { game },
  } = useGame();

  const { icon, color, label } = getGameStatusTag(game);

  return (
    <Box {...props}>
      <Tag
        size="small"
        color={color}
        icon={icon}
        label={label}
      />
    </Box>
  );
};
