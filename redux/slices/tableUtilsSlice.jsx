import { createSlice } from "@reduxjs/toolkit";

const tableUtilsSlice = createSlice({
  name: "tableUtils",

  initialState: {
    bookings: {
      searchTrigger: false,
      filterParams: "",
      sortingParams: {},
      sortingParamsString: "",
      paginationParamsString: "",
      paginationParams: {
        pageSize: 25,
        currentPage: 1,
        totalPages: 1,
      },
    },
  },
  reducers: {
    setFilterParams: (state, { payload: { params } }) => {
      state.bookings.filterParams = params;
    },
    setSortType: (state, { payload: { field } }) => {
      state.bookings.sortingParams = {
        ...field,
      };
    },
    setSearchTrigger: (state) => {
      state.bookings.searchTrigger = !state.bookings.searchTrigger;
    },
    makeSortParamsString: (state, { payload: { str } }) => {
      state.bookings.sortingParamsString = str;
    },
    setPageSize: (state, { payload: { size } }) => {
      state.bookings.paginationParams.pageSize = size;
    },
    setCurrentPage: (state, { payload: { number } }) => {
      state.bookings.paginationParams.currentPage = number;
    },
    setTotalPages: (state, { payload: { total } }) => {
      state.bookings.paginationParams.totalPages = total;
    },
    makePaginationParamsString: (state, { payload: { str } }) => {
      state.bookings.paginationParamsString = str;
    },
  },
});

export const {
  setSearchTrigger,
  setFilterParams,
  setSortType,
  makeSortParamsString,
  setCurrentPage,
  setTotalPages,
  setPageSize,
  makePaginationParamsString,
} = tableUtilsSlice.actions;
export default tableUtilsSlice.reducer;
