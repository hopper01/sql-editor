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
      <main>
        <Suspense fallback={<Loader />}>
          <section className="upper-section">
            <Editor
              setTableName={setTableName}
              query={query}
              setQuery={setQuery}
              setIsOpen={setIsOpen}
              isSample={isSample}
              setIsSample={setIsSample}
              fileName={fileName}
              setFileName={setFileName}
            />
            <Select
              tableName={tableName}
              setTableName={setTableName}
              setQuery={setQuery}
              setIsSample={setIsSample}
              fileName={fileName}
              setIsOpen={setIsOpen}
              setFileName={setFileName}
            />
          </section>
          {tableName && isOpen ? (
            <TableSection tableName={tableName} isSample={isSample} />
          ) : (
            <></>
          )}
        </Suspense>
      </main>
      <footer className="foot">
        <p>
          Coded by ⚙︎ ~{' '}
          <span className="h-01">
            <a
              href="https://github.com/hopper01"
              target="_blank"
              rel="noreferrer"
            >
              Anand Dhawan
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
};

export default App;
