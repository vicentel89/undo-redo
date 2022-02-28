import React, { useState } from 'react';
import { useUndoRedo } from '../hooks/useUndoRedo';

function UndoRedo() {
  const {
    currentValue,
    updateValue,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    isLastRedo,
    getHistoryValueFromCurrentIndex,
  } = useUndoRedo('');

  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    updateValue(inputValue);
    setInputValue('');
  };

  const handleUndoClick = () => {
    handleUndo();
    setInputValue(currentValue);
  };

  const handleRedoClick = () => {
    handleRedo();
    isLastRedo ? setInputValue('') : setInputValue(getHistoryValueFromCurrentIndex(2));
  };

  return (
    <div>
      <div>
        <h5>{getHistoryValueFromCurrentIndex(-3)}</h5>
        <h3>{getHistoryValueFromCurrentIndex(-2)}</h3>
        <h2>{getHistoryValueFromCurrentIndex(-1)}</h2>
        <h1>{currentValue}</h1>
      </div>
      <input type="text" value={inputValue} onChange={handleInput} />
      <button onClick={handleSave}>Save</button>

      <div>
        <button disabled={!canUndo} onClick={handleUndoClick}>
          undo
        </button>
        <button disabled={!canRedo} onClick={handleRedoClick}>
          redo
        </button>
      </div>
    </div>
  );
}

export default UndoRedo;

// function UndoRedo() {
//   const [inputValue, setInputValue] = useState('');
//   const [history, setHistory] = useState([]);
//   const [historyIndex, setHistoryIndex] = useState(-1);

//   const handleInput = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSave = () => {
//     const newHistory = [...history];
//     newHistory.splice(historyIndex + 1, history.length - historyIndex - 1, inputValue);
//     setHistory(newHistory);
//     setHistoryIndex(historyIndex + 1);
//     setInputValue('');
//   };

//   const handleUndo = () => {
//     setHistoryIndex(historyIndex - 1);
//     setInputValue(history[historyIndex]);
//   };

//   const handleRedo = () => {
//     setHistoryIndex(historyIndex + 1);
//     history.length === historyIndex + 2
//       ? setInputValue('')
//       : setInputValue(history[historyIndex + 2]);
//   };

//   return (
//     <div>
//       <div>
//         <p>{historyIndex > 3 && '...'}</p>
//         <h5>{history[historyIndex - 3]}</h5>
//         <h3>{history[historyIndex - 2]}</h3>
//         <h2>{history[historyIndex - 1]}</h2>
//         <h1>{history[historyIndex]}</h1>
//       </div>
//       <input type="text" value={inputValue} onChange={handleInput} />
//       <button onClick={handleSave}>Save</button>

//       <div>
//         <button disabled={historyIndex < 0} onClick={handleUndo}>
//           undo
//         </button>
//         <button disabled={history.length - 1 === historyIndex} onClick={handleRedo}>
//           redo
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UndoRedo;
