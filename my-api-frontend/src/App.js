import React, { useEffect } from 'react';
import ApiInteraction from './ApiInteraction';

function App() {
  useEffect(() => {
    document.title = "YOUR_ROLL_NUMBER";
  }, []);

  return (
    <div className="App">
      <ApiInteraction />
    </div>
  );
}

export default App;