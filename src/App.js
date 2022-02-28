import { useState } from 'react';
import './App.css';
import UndoRedo from './components/UndoRedo';
import UndoRedoOptimized from './components/UndoRedoOptimized';

function App() {
  const [isOptimazed, setisOptimized] = useState(false);

  return (
    <>
      <button style={{ position: 'absolute' }} onClick={() => setisOptimized(!isOptimazed)}>
        change component
      </button>
      <div className="App">{isOptimazed ? <UndoRedoOptimized /> : <UndoRedo />}</div>
    </>
  );
}

export default App;
