import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

export const useWeb3Network = () => {
  const { ethereum } = window;
  const { isActive, provider } = useWeb3React();
  const [networkError, setNetworkError] = useState(false);
  const [chainId, setChainId] = useState<number | undefined>();

  const checkChainId = async () => {
    if (isActive) {
      // Only proceed if wallet is connected
      const network = await provider?.getNetwork(); // Get network info from the provider
      setChainId(network?.chainId); // Update state with the current chain ID
      setNetworkError(network?.chainId !== 5); // Set error if not on Goerli test network (chain ID 5)
    } else {
      setNetworkError(false); // No error if wallet is not connected
    }
  };

  useEffect(() => {
    checkChainId();
  }, [isActive, provider]);

  const switchNetwork = async () => {
    if (!ethereum) return;
    const eth = ethereum as any;
    try {
      await eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // If the Goerli network is not added in MetaMask, try to add it
        await eth.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x5',
              rpcUrl:
                'https://goerli.infura.io/v3/5ac444b3c8014807ae1d035e482d996f',
            },
          ],
        });
      } else {
        console.error('Failed to switch network:', error);
      }
    }
  };

  return {
    chainId,
    networkError,
    switchNetwork,
  };
};
