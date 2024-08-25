import React, { useEffect } from 'react';
import ApiInteraction from './ApiInteraction';

function App() {
  useEffect(() => {
    document.title = "21BCE3451";
  }, []);

  return (
    <div className="App">
      <ApiInteraction />
    </div>
  );
}

export default App;