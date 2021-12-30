import { useState } from 'react';
import Bouton from '../common/Button';
import { TABLE_NAMES, SELECT_QUERY } from '../../constants/index';
import {
  FormLabel,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import './select.css';
import { csvToJSON } from '../../utils/index';

const SelectMenu = ({ setFileName, fileName, tableName, setTableName, setQuery, setIsSample }) => {
  // const [fileName, setFileName] = useState('');
  const readCSV = e => {
    e.preventDefault();
    const fileName = e.target.files[0].name || 'myFile.csv';
    const tableName = fileName.slice(0, -4);
    setFileName(fileName);
    console.log(SELECT_QUERY + ' ' + tableName);
    setQuery(SELECT_QUERY + ' ' + tableName);
    setIsSample(false);
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      const json = csvToJSON(text);
      localStorage.setItem('data', JSON.stringify(json));
      localStorage.setItem('fileName', fileName);
    };
    reader.readAsText(e.target.files[0]);
    
  };
  const handleChange = event => {
    const currentTable = event.target.value;
    if (currentTable) {
      setTableName(currentTable);
      setQuery(SELECT_QUERY + ' ' + currentTable);
      setIsSample(true);
      // remove file from localStorage
      setFileName('');
      // localStorage.clear();
    }
  };
  // const tables = TABLE_NAMES;
  return (
    <div className="select-box">
      <div className="upload">
        <section>
          <div className="file-upload reverse">
            <input
              id="file-sr"
              type="file"
              onChange={e => readCSV(e)}
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <label htmlFor="file-sr">
              <span>{fileName}</span>
              <span id="upload">Upload CSV</span>
            </label>
          </div>
        </section>
      </div>
      <span>OR</span>
      <div className="select-menu">
        <FormLabel color="primary" sx={{ width: '100%' }}>
          Select from Sample
        </FormLabel>
        <FormControl fullWidth>
          <InputLabel id="table">Table</InputLabel>
          <Select
            value={TABLE_NAMES.includes(tableName) ? tableName : ''}
            label="table"
            onChange={handleChange}
          >
            {TABLE_NAMES &&
              TABLE_NAMES.map((table, key) => {
                return (
                  <MenuItem key={key} value={table}>
                    {table}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SelectMenu;
