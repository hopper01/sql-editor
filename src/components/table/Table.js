import React, { useState } from 'react';
import Bouton from '../common/Button';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { TableHeader } from './TableHeader';
import './index.css';

const TableWrapper = ({ columns, data, completeData, tableName }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state,
    setPageSize,
    pageOptions,
    gotoPage,
    pageCount,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );


  return (
    <>
      {/* table Header */}
      <TableHeader
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        completeData={completeData}
        tableName={tableName}
      />

      {/* table */}
      <Paper id="table-base">
        <TableContainer id="table-main">
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, key) => (
                    <TableCell
                      key={key}
                      align="center"
                      id="table-headings"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      <span className="sorting-arrows">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? '↓'
                            : '↑'
                          : ''}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody
              {...getTableBodyProps()}
              className="bg-white text-black divide-y divide-gray-200"
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell, key) => {
                      return (
                        <TableCell
                          component="td"
                          scope="row"
                          align="center"
                          key={key}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <div className="pagination">
        <div className="page-select">
          <span style={{ marginRight: '10px' }}>
            Page <span>{state.pageIndex + 1}</span> of{' '}
            <span>{pageOptions.length}</span>
          </span>
          <select
            value={state.pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="page-toggle">
          <Bouton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            &laquo;
          </Bouton>
          <Bouton onClick={() => previousPage()} disabled={!canPreviousPage}>
            &lt;
          </Bouton>
          <Bouton onClick={() => nextPage()} disabled={!canNextPage}>
            &gt;
          </Bouton>
          <Bouton
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            &raquo;
          </Bouton>
        </div>
      </div>
    </>
  );
};

export default TableWrapper;
