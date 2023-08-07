"use client";
import { createSlice } from "@reduxjs/toolkit";

const atinaSlice = createSlice({
  name: "atina",

  initialState: {
    atinaUsers: [],
    mobileBookings: {},
    bookingTypes: [],
    nfcTags: [],
    atinaItems: {},
    userRoles: [],
    loading: false,
    error: false,
    errorMsg: "",
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      state.loading = false;
      state.error = false;
      state.errorMsg = "";
      if (url.toLowerCase().includes("mobile")) {
        state.mobileBookings = data;
      } else if (url.toLowerCase().includes("nfc")) {
        state.nfcTags = data;
      } else if (url.toLowerCase().includes("users")) {
        state.atinaUsers = data;
      } else if (url.toLowerCase().includes("items")) {
        state.atinaItems = data;
      } else if (url.toLowerCase().includes("bookingtypes")) {
        state.bookingTypes = data;
      } else if (url.toLowerCase().includes("roledefinitions")) {
        state.userRoles = data;
      }
    },
    fetchFail: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = message;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = atinaSlice.actions;
export default atinaSlice.reducer;
