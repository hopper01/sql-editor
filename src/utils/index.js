import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_SETTINGS } from '../constants/index';

const raiseError = message => {
  toast.error(message, {
    ...TOAST_SETTINGS,
  });
};

const rasieSuccess = message => {
  toast.success(message, {
    ...TOAST_SETTINGS,
  });
};
const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });
  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

const downloadAsJson = (data, tableName) => {
  downloadFile({
    data: JSON.stringify(data),
    fileName: `${tableName}.json`,
    fileType: 'text/json',
  });
};
const csvToJSON = csv => {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
};

export { rasieSuccess, raiseError, downloadAsJson, csvToJSON };
