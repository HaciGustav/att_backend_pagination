import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import UserModal from "../modals/UserModal";
import { tableStyles } from "@/styles/table_styles";
import ConfirmDialog from "../ConfirmDialog";
import EditDeleteCells from "./row_components/EditDeleteCells";

const UsersTableRow = ({ row, prepareRow, resetResize }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenUserModal(true);
      console.log(row?.original);
    }
  };
  useEffect(() => {
    prepareRow(row);
  }, [resetResize, row]);

  return (
    <>
      <ConfirmDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        id={row?.original.id}
      />
      <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
        userInfo={row.original}
      />
      <TableRow
        {...row.getRowProps()}
        sx={tableStyles.tr.row}
        onClick={handleDblClick}
      >
        {row.cells.map((cell) => {
          return (
            <TableCell
              {...cell.getCellProps()}
              sx={tableStyles.tr.cell}
              align="left"
              scope="row"
            >
              {cell.render("Cell")}
            </TableCell>
          );
        })}
        <EditDeleteCells
          setOpenModal={setOpenUserModal}
          setOpenDialog={setOpenDialog}
        />
      </TableRow>
    </>
  );
};

export default UsersTableRow;
