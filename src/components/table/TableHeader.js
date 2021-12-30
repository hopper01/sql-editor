import React, { useState } from 'react';
import CsvDownload from 'react-json-to-csv';
import { downloadAsJson } from '../../utils/index';
import { Menu, MenuItem, Chip } from '@mui/material';
import Bouton from '../common/Button';
import { useAsyncDebounce } from 'react-table';

const SearchBar = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <Chip label={`${count} Records Found`} variant="outlined" sx={{backgroundColor: '#726A95', color: '#ffff' }} />
      {/* Search Bar */}
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            value={value || ''}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            className="searchTerm"
            placeholder="Search records here ..."
          />
        </div>
      </div>
    </>
  );
};

export const TableHeader = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    completeData,
    tableName,
  } = props;
  return (
    <div id="table-head">
      <SearchBar
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div>
        <Bouton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Export &#8595;
        </Bouton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <CsvDownload
              data={completeData}
              filename={`${tableName}.csv`}
              className="menu-btn"
            >
              as CSV
            </CsvDownload>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <button
              className="menu-btn"
              onClick={() => downloadAsJson(completeData, tableName)}
            >
              as JSON
            </button>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
