import { useEffect, useState } from 'react';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';

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

  useEffect(() => {
    async function fetch() {
      if (!provider) return;
      const balance = !!account && (await provider.getBalance(account));
      !!balance && setBalance(Number(formatEther(balance)));
      return balance;
    }
    fetch();
  }, [provider, account]);

  return balance;
};
