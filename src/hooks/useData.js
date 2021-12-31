import { useEffect, useState } from 'react';
import {
  TABLE_RESOURCE,
  TABLE_NAMES,
  TOAST_SETTINGS,
} from '../constants/index';
import { rasieSuccess, raiseError } from '../utils/index';
import { csvToJSON } from '../utils/index';

const getURL = name => `${TABLE_RESOURCE}${name}.csv`;
/**
 * Custom hook which returns
    a. table data
    b. time to fetch the data
    c. error -> if any
 */
const useData = (tableName, isSample) => {
  // if the Table is uploaded by user.
  if (!isSample) {
    let error = false,
      queryTime = 0;
    const data = JSON.parse(localStorage.getItem('data'));
    if (!data) error = true;
    return { data, queryTime, error };
  } else { // if the Table is choosen from the samples
    const { data, queryTime, error } = FetchFromSample(tableName);
    return { data, queryTime, error };
  }
};

/**
 * Method for fectching the csv data and convert it into json.
 * @param tablename 
 * @returns { data, queryTime, error }
 */
const FetchFromSample = tableName => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [queryTime, setqueryTime] = useState('');
  useEffect(() => {
    let t_before = performance.now(); //start time
    fetchData(tableName);
    let t_after = performance.now(); //end time
    setqueryTime(t_after - t_before);
  }, [tableName]);
  const convertToJson = data => {
    const D = csvToJSON(data);
    setData(D);
    rasieSuccess('Query ran successfully!');
  };
  const fetchData = tableName => {
    const name = TABLE_NAMES.find(name => name === tableName);
    if (name) {
      try {
        setError(false);
        fetch(getURL(tableName), {
          headers: {
            Accept: 'application/vnd.github.v4+raw',
          },
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              raiseError('Something went wrong');
            }
          })
          .then(data => convertToJson(atob(data.content.replace('\n', ''))));
      } catch (error) {
        raiseError(error.message);
      }
    } else {
      setError(true);
      raiseError('Oops!, Table Not Present');
    }
  };
  return { data, queryTime, error };
};

export default useData;
