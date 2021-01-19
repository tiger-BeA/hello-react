import './App.scss';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from './components/error-boundary';

const IntroductionPage = React.lazy(() => import('./pages/introduction-page'));

const FragmentPage = React.lazy(() =>
  new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, 3000);
  }).then(() => import('./pages/fragment-page')),
);

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={() => <IntroductionPage />} />
            <Route exact path="/fragment" component={() => <FragmentPage />} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
