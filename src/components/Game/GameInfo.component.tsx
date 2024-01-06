import React, { FC } from 'react';
import { Box, Chip } from '@mui/material';
import { formatEther } from '@ethersproject/units';

import { getGameStatus, isGameDone, useEtherPrice } from '../../utils';
import { Game, Move } from '../../interfaces';
import { useWeb3Wallet } from '../../hooks';
import { InfoWrapper } from '../Game';
import { Moves } from '../../context/Game.context';

interface Props {
  game: Game;
}

interface TitleProps {
  title: string;
}

const Owner = ({ title }: TitleProps) => (
  <Box
    component="span"
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 2,
      alignItems: 'center',
    }}
  >
    {title}
    <Chip label="You" />
  </Box>
);

export const GameInfo: FC<Props> = ({ game }): JSX.Element => {
  const { account } = useWeb3Wallet();
  const gameDone = isGameDone(game);
  const status = getGameStatus(game);
  const etherPrice = useEtherPrice();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {gameDone && status !== 'cancelled' && !!game.result && (
        <InfoWrapper
          winner
          title="🏆 Winner"
          content={game.result}
        />
      )}
      <InfoWrapper
        title="💰 Stake"
        content={`${formatEther(game.stake)} ETH ${
          !!etherPrice && Number(formatEther(game.stake)) > 0
            ? `(\u2248 ${(Number(formatEther(game.stake)) * etherPrice).toFixed(
                2
              )}$)`
            : ''
        }`}
      />
      <InfoWrapper
        title={
          account === game.j1.address ? (
            <Owner title="👱 Player one" />
          ) : (
            `👱 Player one`
          )
        }
        content={game.j1.address}
      />
      <InfoWrapper
        title={
          account === game.j2.address ? (
            <Owner title="👱 Player two" />
          ) : (
            `👱 Player two`
          )
        }
        content={game.j2.address}
      />
      <InfoWrapper
        title="#️⃣ Commitment"
        content={game.j1.commitment}
      />
      <InfoWrapper
        title="⏰ Last action"
        content={game.lastAction.toLocaleString()}
      />
      <InfoWrapper
        title="✍️ Player 2 move"
        content={
          game.j2.move === Move.Null
            ? '⌛️ Pending'
            : Object.values(Moves)[game.j2.move - 1]
        }
      />
    </Box>
  );
};
