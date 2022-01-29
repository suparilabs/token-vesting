/* eslint-disable react/jsx-key */
import React from "react";
import { useTable } from "react-table";

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(
          (headerGroup: {
            getHeaderGroupProps: () => JSX.IntrinsicAttributes &
              React.ClassAttributes<HTMLTableRowElement> &
              React.HTMLAttributes<HTMLTableRowElement>;
            headers: {
              getHeaderProps: () => JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLTableHeaderCellElement> &
                React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
              render: (
                arg0: string,
              ) => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
            }[];
          }) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(
                (column: {
                  getHeaderProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableHeaderCellElement> &
                    React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                  render: (
                    arg0: string,
                  ) => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
                }) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ),
              )}
            </tr>
          ),
        )}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function VestingDetails() {
  const data = React.useMemo(
    () => [
      {
        Beneficiary: "Charlie",
      },
      {
        Beneficiary: "",
      },
      {
        Beneficiary: "Peter",
      },
      {
        Beneficiary: "Virat",
        age: 30,
      },
      {
        Beneficiary: "Rohit",
      },
      {
        Beneficiary: "Dhoni",
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Beneficiary",
        accessor: "Beneficiary",
      },
      {
        Header: "Start Date",
        accessor: "Start Date",
      },
      {
        Header: "Cliff",
        accessor: "Cliff",
      },
      {
        Header: "End Date",
        accessor: "End date",
      },
      {
        Header: "Total Vesting",
        accessor: "Total Vesting",
      },
    ],
    [],
  );

  return <Table columns={columns} data={data} />;
}
