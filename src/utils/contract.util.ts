import { ContractFactory } from 'ethers';

export const getContractFactory = (
  bytecode: string,
  abi: any,
  library: any,
  account?: string | null
): ContractFactory => {
  return new ContractFactory(abi, bytecode, library.getSigner(account));
};
