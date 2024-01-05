import { BigNumber, Contract, ContractFactory } from 'ethers';

import { Game, Move } from '../interfaces';
import { getAddress } from '@ethersproject/address';

export const getContractFactory = (
  bytecode: string,
  abi: any,
  library: any,
  account?: string | null
): ContractFactory => {
  return new ContractFactory(abi, bytecode, library.getSigner(account));
};

const secondsToMiliseconds = (seconds: number): number => seconds * 1000;

export const getGameData = async (contract: Contract): Promise<Game> => {
  const [
    j1Address,
    j1Commitment,
    j2Address,
    j2Move,
    stake,
    lastAction,
    timeoutSeconds,
  ] = await Promise.all([
    contract.j1(),
    contract.c1Hash(),
    contract.j2(),
    contract.c2(),
    contract.stake(),
    contract.lastAction(),
    contract.TIMEOUT(),
  ]);

  return {
    address: contract.address,
    j1: {
      address: j1Address,
      commitment: j1Commitment,
    },
    j2: {
      address: j2Address,
      move: j2Move as Move,
    },
    stake: BigNumber.from(stake),
    lastAction: new Date(secondsToMiliseconds(Number(lastAction))),
    timeout: secondsToMiliseconds(timeoutSeconds),
    result: '',
  };
};

export const isAddress = (value: string) => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
};
