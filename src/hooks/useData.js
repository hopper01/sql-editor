import { useEffect, useState } from 'react';
import {
  TABLE_RESOURCE,
  TABLE_NAMES,
  TOAST_SETTINGS,
} from '../constants/index';
import { rasieSuccess, raiseError } from '../utils/index';
import { csvToJSON } from '../utils/index';

const getURL = name => `${TABLE_RESOURCE}${name}.csv`;

const useData = (tableName, isSample) => {
  if (!isSample) {
    let error = false,
      queryTime = 0;
    const data = JSON.parse(localStorage.getItem('data'));
    console.log(data);
    if (!data) error = true;
    return { data, queryTime, error };
  }
  const { data, queryTime, error } = FetchFromSample(tableName);
  return { data, queryTime, error };
};
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
