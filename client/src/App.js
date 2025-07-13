import React, { useState, useEffect } from 'react';
import BugForm from './BugForm';
import BugList from './BugList';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="container">
        <h1>Bug Tracker</h1>
        <BugForm />
        <BugList />
      </div>
    </ErrorBoundary>
  );
}

export default App;
