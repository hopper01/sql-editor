import useData from '../../hooks/useData';
import TableWrapper from './Table';
import Loader from '../common/Loader';
import { Chip } from '@mui/material';

const TableSection = ({ tableName, isSample }) => {
  const { data, queryTime, error } = useData(tableName, isSample);
  const columns = (() => {
    if (data.length > 0) {
      return Object.keys(data[0]).map(key => {
        const columnName = data[0][key];
        return {
          Header: columnName,
          accessor: key,
        };
      });
    }
  })();
  const queryResult = data.slice(1);
  if (error)
    return (
      <section>
        <h1>404! Something is wrong here 🤨</h1>
      </section>
    );
  return (
    <>
      <section>
        {data.length > 0 ? (
          <>
            <div className="table-details">
              <Chip
                label={`Query took ${queryTime.toFixed(2)} ms`}
                variant="outlined"
              />
              <div>
                <span style={{ padding: '10px' }}>Table Name:</span>
                <Chip label={tableName} variant="outlined" />
              </div>
            </div>
            <TableWrapper
              columns={columns}
              completeData={data}
              data={queryResult}
              tableName={tableName}
            />
          </>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
};

export default TableSection;
