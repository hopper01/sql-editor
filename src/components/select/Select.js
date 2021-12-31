import Bouton from '../common/Button';
import { TABLE_NAMES, SELECT_QUERY } from '../../constants/index';
import {
  FormLabel,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import './select.css';
import { csvToJSON } from '../../utils/index';
import { raiseError } from '../../utils/index';

const SelectMenu = ({
  setFileName,
  fileName,
  tableName,
  setTableName,
  setQuery,
  setIsSample,
  setIsOpen,
}) => {
  /**
   * Method for reading the user CSV file and convert data into json.
   */
  const readCSV = e => {
    e.preventDefault();
    const fileName = e.target.files[0].name || 'myFile.csv';
    if(fileName.indexOf('.csv') < 0) {
      raiseError("Incorrect File Format!");
      return;
    }
    const tableName = fileName.slice(0, -4);
    const reader = new FileReader();
    reader.onload = e => {
      localStorage.clear();
      const text = e.target.result;
      const json = csvToJSON(text);
      localStorage.setItem('data', JSON.stringify(json));
      localStorage.setItem('fileName', fileName);
      setTableName(tableName);
      setFileName(fileName);
      setQuery(SELECT_QUERY + ' ' + tableName);
      setIsSample(false);
    };
    reader.readAsText(e.target.files[0]);
  };
  /**
   * Method for selecting different tables from the samples-list.
   */
  const handleChange = event => {
    const currentTable = event.target.value;
    if (currentTable) {
      setTableName(currentTable);
      setQuery(SELECT_QUERY + ' ' + currentTable);
      setIsSample(true);
      setFileName('');
    }
  };
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
