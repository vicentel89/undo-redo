import { useState, useMemo, useCallback } from 'react';

export const useUndoRedo = () => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const updateValue = (newValue) => {
    const newHistory = [...history];
    newHistory.splice(historyIndex + 1, history.length - historyIndex - 1, newValue);
    setHistory(newHistory);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    setHistoryIndex(historyIndex - 1);
  };

  const handleRedo = () => {
    setHistoryIndex(historyIndex + 1);
  };

  const getHistoryValueFromCurrentIndex = useCallback(
    (offset) => history[historyIndex + offset],
    [history, historyIndex]
  );

  const currentValue = useMemo(() => history[historyIndex], [history, historyIndex]);
  const canUndo = useMemo(() => historyIndex >= 0, [historyIndex]);
  const canRedo = useMemo(() => history.length - 1 !== historyIndex, [history, historyIndex]);
  const isLastRedo = useMemo(() => history.length === historyIndex + 2, [history, historyIndex]);

  return {
    currentValue,
    updateValue,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    isLastRedo,
    getHistoryValueFromCurrentIndex,
  };
};

export const useUndoRedoOpt = (initialValues) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentValues, setCurrentValues] = useState(initialValues);
  const [changedValues, setChangedValues] = useState({});

  const handleChange = (input) => (e) => {
    setInputValues({ ...inputValues, [input]: e.target.value });
    setChangedValues({ ...changedValues, [input]: currentValues[input] });
  };

  const updateValues = () => {
    const newHistory = [...history];
    newHistory.splice(historyIndex + 1, history.length - historyIndex - 1, changedValues);
    setHistory(newHistory);
    setCurrentValues(inputValues);
    setChangedValues({});
    setHistoryIndex(historyIndex + 1);
  };

  const UndoOrRedo = useCallback(
    (isRedo) => {
      const offset = isRedo ? 1 : 0;

      const changes = history[historyIndex + offset];
      const newCurrentValues = { ...currentValues };
      const newChangedValues = {};
      const newHistory = [...history];

      Object.keys(changes).forEach((changeKey) => {
        newCurrentValues[changeKey] = changes[changeKey];
        newChangedValues[changeKey] = currentValues[changeKey];
      });

      newHistory[historyIndex + offset] = newChangedValues;

      setHistory(newHistory);
      setCurrentValues(newCurrentValues);
      setInputValues(newCurrentValues);
      setHistoryIndex(isRedo ? historyIndex + 1 : historyIndex - 1);
    },
    [history, historyIndex, currentValues]
  );

  const handleUndo = () => {
    UndoOrRedo();
  };

  const handleRedo = () => {
    UndoOrRedo(true);
  };

  const canUndo = useMemo(() => historyIndex >= 0, [historyIndex]);
  const canRedo = useMemo(() => history.length - 1 !== historyIndex, [history, historyIndex]);

  // console.log('history: ', history);
  // console.log('historyIndex: ', historyIndex);
  // console.log('========================');

  return {
    currentValues,
    updateValues,
    inputValues,
    handleChange,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
  };
};
