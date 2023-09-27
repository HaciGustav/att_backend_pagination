import { Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableStyles } from "@/styles/table_styles";

const Admin = () => {
  const [sqlQuery, setSqlQuery] = useState(
    "SELECT * FROM ATINA_MobileBookings Where UserID = 5656"
  );
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleSubmit = async () => {
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

      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSqlQuery(e.target.value);
  };

  useEffect(() => {
    if (data.length) {
      const x = Object.keys(data[0]);
      setHeaders(x);
    }
  }, [data]);

  return (
    <>
      <div
        style={{
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "end",
          rowGap: "8px",
          padding: "1rem",
          // backgroundColor: "yellow",
          position: "relative",
        }}
      >
        <TextField
          sx={{ width: "100%" }}
          onChange={handleChange}
          value={sqlQuery || ""}
          label="Multiline"
          multiline
          rows={10}
          inputProps={{ spellCheck: "false" }}
        ></TextField>
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>

      <TableContainer
        component={Paper}
        sx={{ ...tableStyles.tableContainer, p: 0 }}
      >
        <Table sx={{ minWidth: 650, position: "relative" }}>
          <TableHead sx={{ ...tableStyles.tableHead, top: -2 }}>
            <TableRow>
              {headers?.map((header, i) => (
                <TableCell
                  key={i}
                  sx={{
                    ...tableStyles.th.cell,
                    minWidth: 100,
                    p: 1,
                  }}
                  align="center"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.ID}>
                {headers?.map((cell, i) => (
                  <TableCell
                    key={i}
                    sx={{ ...tableStyles.tr.cell, p: 0.3, fontSize: "0.6rem" }}
                    align="left"
                  >
                    {JSON.stringify(row[cell])?.replaceAll('"', "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Admin;
