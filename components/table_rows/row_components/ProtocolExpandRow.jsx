import BookingImages from "./BookingImages";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { memo } from "react";

const ProtocolExpandRow = ({ row, open }) => {
  return (
    <TableRow>
      <TableCell style={{ padding: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <p style={{ padding: "1rem", fontSize: "0.7rem" }}>
            {row?.original?.description?.split("\n").map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </p>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default memo(ProtocolExpandRow);
