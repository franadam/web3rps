import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { metaMask } from '../utils';

export const useWeb3Wallet = () => {
  const { isActive, account } = useWeb3React();
  const [loading, setLoading] = React.useState(false);

  const connect = async () => {
    setLoading(true);

    await metaMask
      .activate(5)
      .then(() => localStorage.setItem('connexionType', 'injected'))
      .catch(() => console.log({ title: 'MetaMask not found' }));
    console.log('account', account);

    setLoading(false);
  };

  const disconnect = async () => {
    try {
      setLoading(true);
      await metaMask?.deactivate?.();
      localStorage.removeItem('connexionType');
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    connect,
    disconnect,
    account,
    active: isActive,
    loading,
  };
};
