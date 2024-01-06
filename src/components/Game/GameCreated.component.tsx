import React, { FC } from 'react';
import { Button, Container } from '@mui/material';
import { BigNumber } from 'ethers';
import { CgArrowRight } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

import { useGame } from '../../hooks/useGame.hook';
import actions from '../../context/game.action';
import { Moves } from '../../context/Game.context';
import { Move } from '../../interfaces';
import { Card } from '../Card.component';
import { InfoWrapper } from '../Game';

interface Props {
  move: number;
  salt: BigNumber;
  address: string;
}

export const GameCreated: FC<Props> = ({
  move,
  salt,
  address,
}): JSX.Element => {
  const navigate = useNavigate();
  const { dispatch } = useGame();

  const handleNavigation = (): void => {
    dispatch(
      actions.setGameCreated({
        j1Move: Move.Null,
        address: address,
        salt: undefined,
      })
    );
    navigate(`/game/${address}`);
  };

  return (
    <Container
      maxWidth="md"
      style={{ flexDirection: 'column' }}
    >
      <Card>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 2,
            padding: 2,
          }}
        >
          <InfoWrapper
            title="Game address"
            content={address}
          />
          <InfoWrapper
            title="Your move"
            content={Object.values(Moves)[move - 1]}
          />
          <InfoWrapper
            title="Your Salt (You'll need it to solve the game)"
            important
            content={salt._hex}
          />
          <Button
            variant="contained"
            style={{ margin: '32px' }}
            color="primary"
            endIcon={<CgArrowRight />}
            onClick={handleNavigation}
          >
            Go to game
          </Button>
        </div>
      </Card>
    </Container>
  );
};
