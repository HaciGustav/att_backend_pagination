import React, { useEffect, useState } from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/system/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import styles from "../table_styles.module.css";
import { tableStyles } from "@/styles/table_styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CustomTableHead = ({
  headerGroups,
  setResetResize,
  resetResize,
  handleRightClick,
  handleSortParams,
}) => {
  // const [contextMenu, setContextMenu] = useState(initalContextMenu);
  // const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const [showEmptyCells, setShowEmptyCells] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state) => state.settings);
  const { sortingParams } = useSelector((state) => state.tableUtils.bookings);
  useEffect(() => {
    if (
      (router.pathname === "/users" || router.pathname === "/items") &&
      user?.isAdmin
    ) {
      setShowEmptyCells(true);
    }
  }, [user]);

  return (
    <TableHead
      sx={tableStyles.tableHead}
      onContextMenu={(e) => handleRightClick(e, "head")}
    >
      {!headerGroups?.length && (
        <TableCell
          style={{
            height: "50px",
            border: "2px solid red",
            display: "grid",
            placeItems: "center",
          }}
        >
          {!headerGroups?.length && "Sie haben alle Spalten ausgeblendet!"}
        </TableCell>
      )}

      {headerGroups.map((headerGroup) => (
        <TableRow className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <TableCell
              className={styles.th}
              {...column.getHeaderProps()}
              sx={{ ...tableStyles.th.cell, userSelect: "none" }}
              align="left"
              onClick={(e) => handleSortParams(column, e)}
            >
              <div
                // {...column.getSortByToggleProps()}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <span>{column.render("Header")} </span>
                {sortingParams[column.id] === "desc" && (
                  <ArrowDownwardIcon fontSize="small" />
                )}
                {sortingParams[column.id] === "asc" && (
                  <ArrowUpwardIcon fontSize="small" />
                )}

                {/* {column.isSorted ? (
                  column.isSortedDesc ? (
                    <ArrowDownwardIcon fontSize="small" />
                  ) : (
                    <ArrowUpwardIcon fontSize="small" />
                  )
                ) : (
                  ""
                )} */}
              </div>
              <div
                style={{ border: "2px solid green" }}
                {...column.getResizerProps()}
                onClick={(e) => {
                  setResetResize(!resetResize);
                  e.stopPropagation();
                }}
                className={`${styles.resizer} ${
                  column.isResizing ? styles.isResizing : null
                }`}
              />
            </TableCell>
          ))}

          {showEmptyCells && (
            <>
              <TableCell
                className={styles.th}
                sx={{ borderRight: "1px solid #eee", minWidth: "70px" }}
              ></TableCell>
              <TableCell
                className={styles.th}
                sx={{ borderRight: "1px solid #eee", minWidth: "70px" }}
              ></TableCell>
            </>
          )}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default CustomTableHead;
