import './editor.css';
import React, { useEffect } from 'react';
import Bouton from '../common/Button';
import { SELECT_QUERY, TABLE_NAMES } from '../../constants/index';
import { raiseError } from '../../utils/index';

const Editor = ({
  fileName,
  setFileName,
  setTableName,
  query,
  setQuery,
  setIsOpen,
  setIsSample,
  isSample,
  isOpen,
}) => {
  useEffect(() => {
    if (!isSample) {
      setTableName(fileName);
      setIsOpen(!isOpen);
    }
  }, [fileName, isOpen]);
  /**
   * Method to run the query
   */
  const handleSubmit = () => {
    // if user Table is selected
    if (!isSample) {
      const tableName = fileName.slice(0, -4);
      setTableName(tableName);
      setIsOpen(true);
      return;
    }
    // check for valid select query Syntax
    if (query.startsWith(SELECT_QUERY)) {
      let tableName = query.toLowerCase().slice(query.indexOf('from') + 4);
      const X = tableName.slice(1);
      // check if table is present in the constants
      if (tableName && TABLE_NAMES.includes(X)) {
        setTableName(tableName.split(' ')[1]);
        setQuery(SELECT_QUERY + '' + tableName);
        setIsOpen(!isOpen);
      } else {
        setIsOpen(false);
        raiseError('Oops! Table not present');
      }
    } else {
      raiseError('Syntax Error: Enter a valid Query!');
    }
  };
  /**
   * Method to clear the editor -> resets the states to initial values.
   */
  const clearEditor = () => {
    setTableName('');
    setQuery('');
    setFileName('');
    setIsSample(true);
    setIsOpen(false);
  };
  return (
    <div className="editor-box">
      <div className="editor-input">
        <textarea
          placeholder="Write your SQL command here..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-hidden="true"
        ></textarea>
      </div>
      <div className="buttons">
        <Bouton
          variant="contained"
          onClick={handleSubmit}
          disabled={query == '' ? true : false}
        >
          Run Query
        </Bouton>
        <Bouton variant="contained" onClick={clearEditor}>
          Clear
        </Bouton>
      </div>
    </div>
  );
};

export default Editor;
