import React, { useState, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SELECT_QUERY } from './constants/index';
import Header from './components/header/Header';
import Loader from './components/common/Loader';
const Select = React.lazy(() => import('./components/select/Select.js'));
const Editor = React.lazy(() => import('./components/editor/Editor.js'));
const TableSection = React.lazy(() =>
  import('./components/table/TableSection.js'),
);
const App = () => {
  const [tableName, setTableName] = useState('');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSample, setIsSample] = useState(true);
  const [fileName, setFileName] = useState('');
  return (
    <div className="App">
      <ToastContainer />
      <header>
        <Header />
      </header>
      <Suspense fallback={<Loader />}>
        <main>
          <section className="upper-section">
            <Editor
              setTableName={setTableName}
              query={query}
              setQuery={setQuery}
              setIsOpen={setIsOpen}
              isSample={isSample}
              fileName={fileName}
              setIsSample={setIsSample}
              setFileName={setFileName}
            />
            <Select
              tableName={tableName}
              setTableName={setTableName}
              setQuery={setQuery}
              setIsSample={setIsSample}
              fileName={fileName}
              setFileName={setFileName}
            />
          </section>
          {tableName && isOpen ? <TableSection tableName={tableName} isOpen={isOpen} setIsSample={setIsSample} fileName={fileName} isSample={isSample} /> : <></>}
        </main>
      </Suspense>
    </div>
  );
};

export default App;
