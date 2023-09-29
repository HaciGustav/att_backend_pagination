import SqlEditorTableSkeleton from "@/components/skeleton/SqlEditorTableSkeleton";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableStyles } from "@/styles/table_styles";
import SQLQueryFilter from "../filters/SQLQueryFilter";
import { Paper } from "@mui/material";
import axios from "axios";

const SQLQueryTable = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [status, setStatus] = useState({
    isLoading: false,
    err: { isError: false, message: "" },
  });

  const handleSubmit = async (e, sqlQuery) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await axios.post(
        `https://localhost:7294/api/Query`,
        {
          query: sqlQuery,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData(res.data);
      setStatus((prev) => ({ ...prev, isLoading: false }));

      console.log(res.data);
    } catch (error) {
      setStatus({
        isLoading: false,
        err: { isError: true, message: error?.message },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.length) {
      const x = Object.keys(data[0]);
      setHeaders(x);
    }
  }, [data]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        ...tableStyles.tableContainer,
        minHeight: status.isLoading && "90vh",
      }}
    >
      <SQLQueryFilter handleSubmit={handleSubmit} dataCount={data?.length} />

      <Table sx={{ minWidth: 650, position: "relative" }}>
        <TableHead
          sx={{
            ...tableStyles.tableHead,
            top: -8,
            // display: status.isLoading && "none",
            // transition: "0.55s",
          }}
        >
          <TableRow>
            {headers?.map((header, i) => (
              <TableCell
                key={i}
                sx={{
                  ...tableStyles.th.cell,
                  minWidth: 80,
                  p: 1,
                  borderRight: status.isLoading ? "none" : "1px solid #ddd",
                }}
                align="center"
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <SqlEditorTableSkeleton loading={status.isLoading} />
        {!status.isLoading && (
          <TableBody
            sx={{
              minHeight: status.isLoading && "80vh",
              opacity: status.isLoading ? 0 : 1,
              transition: "0.55s",
            }}
          >
            {data?.map((row) => (
              <TableRow key={row.ID}>
                {headers?.map((cell, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      ...tableStyles.tr.cell,
                      p: 0.3,
                      fontSize: "0.6rem",
                      borderRight: status.isLoading ? "none" : "1px solid #ddd",
                    }}
                    align="left"
                    size="small"
                    scope="row"
                  >
                    {JSON.stringify(row[cell])?.replaceAll('"', "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default SQLQueryTable;
