import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Router } from './Router';

const App: FC = (): JSX.Element => {
  return (
    <div>
      <Helmet>
        <title>RPSLS</title>
      </Helmet>
      <Router />
    </div>
  );
};

export default App;
