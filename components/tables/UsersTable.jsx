import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/system/Box";
import UsersTableRow from "../table_rows/UsersTableRow";
import UsersFilter from "../filters/UsersFilter";
import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";
import Tooltip from "@mui/material/Tooltip";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import useColumns from "@/hooks/useColumns";
import Pagination from "../Pagination";
import { useSession } from "next-auth/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserModal from "../modals/UserModal";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import ErrorModal from "../modals/ErrorModal";
import CustomTableHead from "./table_heads/CustomTableHead";
import CustomTableBody from "./table_bodies/CustomTableBody";
import useTableUtils from "@/hooks/table_hooks/useTableUtils";
import {
  useBlockLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import Nfc_TableHead from "./table_heads/NFC_TeableHead";
import Loading_Icon from "../Loading_Icon";

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const UsersTable = ({ usersData }) => {
  const tableRef = useRef(null);
  const { USER_TABLE_COLUMNS } = useColumns();
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(usersData);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [resetResize, setResetResize] = useState(false);

  // const { error, errorMsg } = useSelector((state) => state.atina);
  const { user } = useSelector((state) => state.settings);
  const { getAtinaRoleDefinitions } = useAtinaCalls();

  //? Table Utilities START
  //#region
  const tableColumns = useMemo(() => USER_TABLE_COLUMNS, []);

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 225,
      maxWidth: 600,
    }),
    [tableRef]
  );

  /* const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage,
    pageOptions,
    nextPage,
    previousPage,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  } = useTableUtils(tableColumns, allData, defaultColumn, hiddenColumns); */
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage,
    pageOptions,
    nextPage,
    previousPage,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  } = useTable(
    {
      columns: tableColumns,
      data: allData,
      defaultColumn,
      initialState: {
        pageSize: 25,
      },
      isMultiSortEvent: (e) => {
        if (e.ctrlKey) return true;
      },
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns,
    usePagination
  );
  //#endregion
  //? Table Utilities END

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  const handleFilter = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
    //TODO: Search Function
  };

  const handleReset = () => {
    setFilterVal({});
  };
  // ===Table Filter END===

  useEffect(() => {
    getAtinaRoleDefinitions();
    console.log(user);
    const x = localStorage.getItem("hiddenColumns/users");
    setHiddenColumns(JSON.parse(x));
  }, []);
  return (
    <>
      <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
      />
      {/* {!loading && <Loading />} */}
      {/* {true && <ErrorModal error={errorMsg} />} */}
      {contextMenu.show && (
        <ContextMenu
          allColumns={allColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenUserModal}
          tableColumns={tableColumns}
          tableRef={tableRef}
          state={state}
        />
      )}
      <TableContainer
        component={Paper}
        ref={tableRef}
        sx={tableStyles.tableContainer}
      >
        <UsersFilter
          handleReset={handleReset}
          handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
        />
        <Box sx={tableStyles.helpersWrapper}>
          {loading && <Loading_Icon />}
          <Pagination
            data={allData}
            nextPage={nextPage}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            state={state}
            setPageSize={setPageSize}
            gotoPage={gotoPage}
          />
          <Tooltip title="Spaltengröße rückgängig machen" arrow>
            <IconButton
              onClick={() => {
                resetResizing();
                setResetResize(!resetResize);
              }}
            >
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <DownloadCSV rawData={allData} fileName={"benutzer"} />

          {user?.isAdmin && (
            <Tooltip title="Neuen Datensatz anlegen" arrow>
              <IconButton onClick={() => setOpenUserModal(true)}>
                <AddCircleIcon
                  sx={{
                    borderRadius: "10px",
                    color: "green",
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Table
          ref={tableRef}
          {...getTableProps()}
          sx={{ minWidth: 650, position: "relative" }}
          aria-label="simple table"
          size="small"
        >
          <Nfc_TableHead
            headerGroups={headerGroups}
            resetResize={resetResize}
            setResetResize={setResetResize}
            handleRightClick={handleRightClick}
          />
          <CustomTableBody
            resetResize={resetResize}
            getTableBodyProps={getTableBodyProps}
            prepareRow={prepareRow}
            page={page}
            TableRow={UsersTableRow}
            handleRightClick={handleRightClick}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
