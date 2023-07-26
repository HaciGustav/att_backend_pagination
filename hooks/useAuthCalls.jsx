"use client";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchStart } from "../redux/slices/atinaSlice";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const login = async (info) => {
    const url = `https://pbsolutions.dev/atina/AtinaUsers/login?username=${info.username}&password=${info.password}`;

    let res = null;
    try {
      //TODO: change the admin state with setAdmin function of Settingsslice
      const { data } = await axios.post(url);
      res = data;
    } catch (error) {
      console.log(error);
    }
    return res;
  };

  return { login };
};

export default useAuthCalls;
