import { useEffect, useState } from 'react';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import { Game, GameStatusType, Move } from '../interfaces/Game.interface';
import { useWeb3Wallet } from '../hooks';

export function randomSalt(): BigNumber {
  // Creates 8 x 32-bit integers
  const array = new Uint32Array(8);
  // Assign criptographically secure values for each item in the array
  window.crypto.getRandomValues(array);

  const str = array.reduce((acc, current) => acc + String(current), '');

  // Returns a BigNumber with at most 256 bits
  return BigNumber.from(str).mask(256);
}

export const isAddressEquals = (
  address1: string,
  address2: string
): boolean => {
  return address1 === address2;
};

export const useGetPlayerBalance = () => {
  const { provider, account } = useWeb3React();
  const [balance, setBalance] = useState<number>(0);

  const fetch = async () => {
    if (!provider) return;
    const balance = !!account && (await provider.getBalance(account));
    !!balance && setBalance(Number(formatEther(balance)));
    return balance;
  };

  useEffect(() => {
    fetch();
  }, [provider, account]);

  return balance;
};

export const isGameDone = ({ stake }: Game): boolean => {
  return Number(stake) === 0;
};

export const hasJ2Played = ({ j2 }: Game): boolean => {
  return j2.move !== Move.Null;
};

export const getPlayerId = (game: Game): 1 | 2 | undefined => {
  const { account } = useWeb3Wallet();
  return account === game.j1.address
    ? 1
    : account === game.j2.address
    ? 2
    : undefined;
};

export const getGameStatus = (game: Game): GameStatusType => {
  const isSettled = isGameDone(game);
  const hasPlayed = hasJ2Played(game);
  const playerId = getPlayerId(game);

  if (!playerId) {
    return isSettled
      ? hasPlayed
        ? 'settled'
        : 'cancelled'
      : !hasPlayed
      ? 'actionNeeded'
      : 'pending';
  }

  return isSettled
    ? hasPlayed
      ? 'settled'
      : 'cancelled'
    : playerId === 1 && hasPlayed
    ? 'actionNeeded'
    : playerId === 2 && !hasPlayed
    ? 'actionNeeded'
    : 'pending';
};

export const useEtherPrice = () => {
  const [price, setPrice] = useState<number>();
  const provider = new ethers.providers.EtherscanProvider();

  const fetch = async () => {
    if (!provider) return;
    await provider.getEtherPrice().then(function (price) {
      setPrice(price);
    });
  };

  useEffect(() => {
    fetch();
    return () => {
      provider.removeAllListeners();
    };
  }, []);

  return price;
};

export const canJ1Refund = (
  { j2, lastAction, timeout, stake }: Game,
  currentDate: Date
): boolean => {
  if (Number(stake) === 0) {
    // Game is already settled
    return false;
  }

  if (j2.move !== Move.Null) {
    // Player 2 has already played
    return false;
  }

  return currentDate.getTime() - lastAction.getTime() >= timeout;
};

export const canJ2Refund = (
  { j2, lastAction, timeout, stake }: Game,
  currentDate: Date
): boolean => {
  if (Number(stake) === 0) {
    // Game is already settled
    return false;
  }

  if (j2.move === Move.Null) {
    // Player 2 hasn't played yet
    return false;
  }

  return currentDate.getTime() - lastAction.getTime() >= timeout;
};
