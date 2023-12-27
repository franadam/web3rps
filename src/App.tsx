import React, { FC, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Helmet } from 'react-helmet';
import { MetaMask } from '@web3-react/metamask';
import { Web3ReactHooks } from '@web3-react/core';

import { metaMask, hooks as metaMaskHooks } from './utils/metamask.connector';
import { Router } from './Router';

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];
const App: FC = (): JSX.Element => {
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    });
  }, []);

  return (
    <Web3ReactProvider connectors={connectors}>
      <Helmet>
        <title>RPSLS</title>
      </Helmet>
      <Router />
    </Web3ReactProvider>
  );
};

export default App;
