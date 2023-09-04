import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/system/Box";
// import UsersTableRow from "../table_rows/UsersTableRow";
import UsersFilter from "../filters/UsersFilter";
// import ContextMenu from "../ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import DownloadCSV from "../DownloadCSV";
import { tableStyles } from "@/styles/table_styles";
import Tooltip from "@mui/material/Tooltip";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import useColumns from "@/hooks/useColumns";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import UserModal from "../modals/UserModal";
import useAtinaCalls from "@/hooks/useAtinaCalls";
import { useSelector } from "react-redux";
// import ErrorModal from "../modals/ErrorModal";
import CustomTableHead from "./table_heads/CustomTableHead";
import CustomTableBody from "./table_bodies/CustomTableBody";
import useTableUtils from "@/hooks/table_hooks/useTableUtils";
import Loading_Icon from "../Loading_Icon";
import SSR_Pagination from "../SSR_Pagination";
import usePagination from "@/hooks/usePagination";
import useFilters from "@/hooks/useFilters";
import dynamic from "next/dynamic";

const UsersTableRow = dynamic(() => import("../table_rows/UsersTableRow"));
const UserModal = dynamic(() => import("../modals/UserModal"));
const ErrorModal = dynamic(() => import("../modals/ErrorModal"));
const ContextMenu = dynamic(() => import("../ContextMenu"));

const initalContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const UsersTable = () => {
  const { USER_TABLE_COLUMNS } = useColumns();
  const [contextMenu, setContextMenu] = useState(initalContextMenu);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [allData, setAllData] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [resetResize, setResetResize] = useState(false);
  const [filterVal, setFilterVal] = useState({});
  //! User Credentials State ▼▼▼▼▼▼
  const { user } = useSelector((state) => state.settings);

  //! Items Data and Relevants ▼▼▼▼▼▼
  const { errorMsg, error, atinaUsers, loading } = useSelector(
    (state) => state.atina
  );
  //! Pagination, Sorting and Filtering State ▼▼▼▼▼▼
  const { paginationParams, sortingParams, filterParams, searchTrigger } =
    useSelector((state) => state.tableUtils.users);

  //#region //! Custom Hooks ▼▼▼▼▼▼
  const { handleRightClick } = useContextMenu(contextMenu, setContextMenu);
  const { handleSortParams, makeUrlParams, handlePaginationParams } =
    usePagination("users");

  const { getAtinaRoleDefinitions, getUsersData } = useAtinaCalls();

  //? Table Utilities START
  //#region
  const tableColumns = useMemo(() => USER_TABLE_COLUMNS, []);
  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 225,
      maxWidth: 600,
    }),
    []
  );

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    prepareRow,
    allColumns,
    resetResizing,
    state,
  } = useTableUtils(tableColumns, allData, defaultColumn, hiddenColumns);
  const getTableBodyPropsMemo = useCallback(() => getTableBodyProps(), []);
  //#endregion
  //? Table Utilities END

  useEffect(() => {
    const params = makeUrlParams();
    getUsersData(params + filterParams);
  }, [paginationParams, sortingParams, filterParams, searchTrigger]);

  useEffect(() => {
    if (!atinaUsers?.entries) return;
    setAllData(atinaUsers?.entries);
  }, [atinaUsers]);

  useEffect(() => {
    getAtinaRoleDefinitions();
    const x = localStorage.getItem("hiddenColumns/users");
    setHiddenColumns(JSON.parse(x));
  }, []);
  return (
    <>
      <UserModal
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
      />
      {/* {loading && <Loading />} */}
      {error && <ErrorModal error={errorMsg} />}
      {contextMenu.show && (
        <ContextMenu
          allColumns={allColumns}
          X={contextMenu.x}
          Y={contextMenu.y}
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setOpenModal={setOpenUserModal}
          tableColumns={tableColumns}
          state={state}
        />
      )}
      <TableContainer component={Paper} sx={tableStyles.tableContainer}>
        <UsersFilter
          // handleReset={handleReset}
          // handleFilter={handleFilter}
          filterVal={filterVal}
          setFilterVal={setFilterVal}
        />
        <Box sx={tableStyles.helpersWrapper}>
          {loading && <Loading_Icon />}

          <SSR_Pagination
            paginationParams={paginationParams}
            totalPages={atinaUsers?.totalPages}
            table={"users"}
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
          {...getTableProps()}
          sx={{ minWidth: 650, position: "relative" }}
          aria-label="simple table"
          size="small"
        >
          <CustomTableHead
            headerGroups={headerGroups}
            resetResize={resetResize}
            setResetResize={setResetResize}
            handleRightClick={handleRightClick}
            handleSortParams={handleSortParams}
            table={"users"}
          />
          <CustomTableBody
            resetResize={resetResize}
            getTableBodyProps={getTableBodyPropsMemo}
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
