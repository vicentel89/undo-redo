import React from 'react';
import { useUndoRedoOpt } from '../hooks/useUndoRedo';

function UndoRedoOptimized() {
  const {
    currentValues,
    updateValues,
    inputValues,
    handleChange,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
  } = useUndoRedoOpt({ name: '', age: '', city: '' });

  return (
    <div>
      <div>
        <h1>{getPersonData(currentValues)}</h1>
      </div>
      <label>
        Nombre:
        <input type="text" value={inputValues.name} onChange={handleChange('name')} />
      </label>
      <label>
        Edad:
        <input type="number" value={inputValues.age} onChange={handleChange('age')} />
      </label>
      <label>
        Ciudad:
        <input type="text" value={inputValues.city} onChange={handleChange('city')} />
      </label>
      <button onClick={updateValues}>Save</button>

      <div>
        <button disabled={!canUndo} onClick={handleUndo}>
          undo
        </button>
        <button disabled={!canRedo} onClick={handleRedo}>
          redo
        </button>
      </div>
    </div>
  );
}

export default UndoRedoOptimized;

const getPersonData = (personData) => {
  if (!personData) return '';

  const name = personData.name;
  const age = personData.age;
  const city = personData.city;

  return `${name && name} ${age && `, ${age} años`}  ${city && `, ${city}`}`;
};

// function UndoRedoOptimized() {
//   const [inputValues, setInputValues] = useState(initialValues);
//   const [history, setHistory] = useState([]);
//   const [historyIndex, setHistoryIndex] = useState(-1);
//   const [currentValues, setCurrentValues] = useState(initialValues);
//   const [changedValues, setChangedValues] = useState({});

//   const handleInput = (input) => (e) => {
//     setInputValues({ ...inputValues, [input]: e.target.value });
//     setChangedValues({ ...changedValues, [input]: currentValues[input] });
//   };

//   const handleSave = () => {
//     const newHistory = [...history];
//     newHistory.splice(historyIndex + 1, history.length - historyIndex - 1, changedValues);
//     setHistory(newHistory);
//     setCurrentValues(inputValues);
//     setChangedValues({});
//     setHistoryIndex(historyIndex + 1);
//   };

//   const UndoOrRedo = useCallback(
//     (isRedo) => {
//       const offset = isRedo ? 1 : 0;

//       const changes = history[historyIndex + offset];
//       const newCurrentValues = { ...currentValues };
//       const newChangedValues = {};
//       const newHistory = [...history];

//       Object.keys(changes).forEach((changeKey) => {
//         newCurrentValues[changeKey] = changes[changeKey];
//         newChangedValues[changeKey] = currentValues[changeKey];
//       });

//       newHistory[historyIndex + offset] = newChangedValues;

//       setHistory(newHistory);
//       setCurrentValues(newCurrentValues);
//       setInputValues(newCurrentValues);
//       setHistoryIndex(isRedo ? historyIndex + 1 : historyIndex - 1);
//     },
//     [history, historyIndex, currentValues]
//   );

//   const handleUndo = () => {
//     UndoOrRedo();
//   };

//   const handleRedo = () => {
//     UndoOrRedo(true);
//   };

//   console.log('history: ', history);
//   console.log('historyIndex: ', historyIndex);
//   console.log('========================');

//   return (
//     <div>
//       <div>
//         <h1>{getPersonData(currentValues)}</h1>
//       </div>
//       <label>
//         Nombre:
//         <input type="text" value={inputValues.name} onChange={handleInput('name')} />
//       </label>
//       <label>
//         Edad:
//         <input type="number" value={inputValues.age} onChange={handleInput('age')} />
//       </label>
//       <label>
//         Ciudad:
//         <input type="text" value={inputValues.city} onChange={handleInput('city')} />
//       </label>
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

// export default UndoRedoOptimized;
