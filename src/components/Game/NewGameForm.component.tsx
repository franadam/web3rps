import React, { FC, useMemo } from 'react';
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  Typography,
} from '@mui/material';
import { isAddress } from '@ethersproject/address';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styled from 'styled-components';
import { FaEthereum } from 'react-icons/fa';

import { useWeb3Wallet } from '../../hooks/';
import { isAddressEquals, useGetPlayerBalance } from '../../utils';
import { Move, NewGameData } from '../../interfaces';
import { SelectMove } from '../SelectMove.component';

interface Props {
  onClick?: (data: NewGameData) => void;
}

export const NewGameForm: FC<Props> = ({ onClick }: Props): JSX.Element => {
  const { account } = useWeb3Wallet();
  const [newGameData, setNewGameData] = React.useState<NewGameData>({
    j1Move: 0,
    j2Address: '',
    stake: 0,
  });
  const balance = useGetPlayerBalance();

  const validatej2Address = useMemo(() => {
    if (newGameData.j2Address === account) {
      return false;
    }
    return true;
  }, [newGameData.j2Address, account]);

  const validateEthersBalance = useMemo(() => {
    if (newGameData.stake > balance) {
      return false;
    }
    return true;
  }, [newGameData.stake, balance]);

  if (!account) return <></>;

  return (
    <div>
      <StyledTypography variant="h6">✍️ Your move</StyledTypography>
      <SelectMove
        id="j1Move"
        value={newGameData.j1Move}
        onChange={(e) =>
          setNewGameData({
            ...newGameData,
            j1Move: e.target.value as unknown as Move,
          })
        }
      />

      <FormControl
        fullWidth
        error={
          isAddressEquals(newGameData.j2Address, account) ||
          (!!newGameData.j2Address && !isAddress(newGameData.j2Address))
        }
      >
        <StyledTypography
          color={
            isAddressEquals(newGameData.j2Address, account) ||
            (!!newGameData.j2Address && !isAddress(newGameData.j2Address))
              ? 'error'
              : 'initial'
          }
          variant="h6"
        >
          👱 Player 2 address
        </StyledTypography>
        <Input
          fullWidth
          value={newGameData.j2Address}
          type="text"
          placeholder="Choose a player"
          onChange={(e) =>
            setNewGameData({
              ...newGameData,
              j2Address: e.currentTarget.value,
            })
          }
          startAdornment={
            isAddress(newGameData.j2Address) && (
              <InputAdornment position="start">
                <RoundedJazzicon
                  seed={jsNumberForAddress(newGameData.j2Address)}
                />
              </InputAdornment>
            )
          }
        />
        {isAddressEquals(newGameData.j2Address, account) && (
          <StyledTypography
            variant="caption"
            color="error"
          >
            You can &apost play against yourself
          </StyledTypography>
        )}
        {!!newGameData.j2Address && !isAddress(newGameData.j2Address) && (
          <StyledTypography
            variant="caption"
            color="error"
          >
            Please enter a correct wallet address
          </StyledTypography>
        )}
      </FormControl>

      <FormControl
        fullWidth
        error={!validateEthersBalance}
      >
        <StyledTypography
          color={!validateEthersBalance ? 'error' : 'initial'}
          variant="h6"
        >
          💰 Stake
        </StyledTypography>
        <Input
          fullWidth
          error={newGameData.stake < 0}
          value={newGameData.stake}
          type="number"
          placeholder="Choose a stake"
          onChange={(e) =>
            setNewGameData({
              ...newGameData,
              stake: Number(e.currentTarget.value),
            })
          }
          endAdornment={
            <InputAdornment position="end">
              <Button
                onClick={() =>
                  setNewGameData({ ...newGameData, stake: balance })
                }
                variant="text"
                style={{ fontWeight: 'bold' }}
                disabled={newGameData.stake === balance}
              >
                MAX
              </Button>
              <span style={{ fontWeight: 'bold' }}>
                <FaEthereum /> ETH
              </span>
            </InputAdornment>
          }
        />

        {!newGameData.stake ||
          (newGameData.stake < 0 && (
            <StyledTypography
              variant="caption"
              color="error"
            >
              The stake must be positive
            </StyledTypography>
          ))}

        {!validateEthersBalance && (
          <StyledTypography
            variant="caption"
            color="error"
          >
            Your balance is too low
          </StyledTypography>
        )}
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        disabled={
          !newGameData.j2Address ||
          !validatej2Address ||
          !isAddress(newGameData.j2Address) ||
          !newGameData.stake ||
          newGameData.stake < 0 ||
          !newGameData.j1Move ||
          !validateEthersBalance
        }
        onClick={() => onClick && onClick(newGameData)}
      >
        Create game
      </Button>
    </div>
  );
};

const RoundedJazzicon = styled(Jazzicon)`
  border-radius: 50%;
  padding: 4px;
`;

const StyledTypography = styled(Typography)`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;
