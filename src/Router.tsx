import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Game, NewGame } from './pages';
import { DashboardLayout } from './components';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardLayout />}
        >
          <Route
            index
            element={<NewGame />}
          />
          <Route
            path="/game/:contract"
            element={<Game />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
